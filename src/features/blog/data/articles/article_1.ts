import type { Block } from '../../../../types/article';

export const blocks: Block[] = [
    {
        "type": "paragraph",
        "content": [
            {
                "text": "After about 5 months into my first job as a software engineer, I was tasked with building a retry mechanism for sending failed financial data notifications."
            }
        ]
    },
    {
        "type": "heading",
        "level": 2,
        "content": [
            {
                "text": "The Problem"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Our system extracts financial data and notifies external clients that their data is ready to be fetched via an API. This notification is sent as an HTTP request to the client's server, and once they receive it, they can pull the data from our system."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Sometimes, the client's server is down."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "When that happens, we receive responses like "
            },
            {
                "text": "500",
                "marks": [
                    "bold"
                ]
            },
            {
                "text": ", "
            },
            {
                "text": "503",
                "marks": [
                    "bold"
                ]
            },
            {
                "text": ", or "
            },
            {
                "text": "504",
                "marks": [
                    "bold"
                ]
            },
            {
                "text": ". This means our request reached their server, but the notification was not accepted or processed. The requirement was to build a retry mechanism so the client eventually gets notified."
            }
        ]
    },
    {
        "type": "heading",
        "level": 2,
        "content": [
            {
                "text": "Going Straight Into Designing"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "The ticket already mentioned exponential backoff, so my first instinct was to implement retries directly in code. The idea was to retry after a few seconds, then wait a bit longer, and keep increasing the delay after each failure."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Something like 3s → 5s → 10s → 30s → 1 min → 2 min.",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "To make this work, I thought I could simply use an in-memory counter variable to track when the next notification should be sent."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "System components so far: just one variable.",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Then my team lead asked a simple question."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "\"What if the pod restarts?\""
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "If the pod restarts, the retry counter is lost, and we no longer know when or how many times we retried."
            }
        ]
    },
    {
        "type": "heading",
        "level": 2,
        "content": [
            {
                "text": "Making the State Persistent"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "The retry state needed to be persistent. Me and my team lead decided that we should store the retry count and the next retry timestamp in the database."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "While discussing this, we noticed another gap. We weren't even storing failed notifications earlier. To support retries properly, we now had to store failed notifications as well."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "To process these stored retries, I planned to add a cron job that would continuously scan the database and send the next eligible notification back to the application."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "System components now: code changes, database table changes, and a new cron job.",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "\"Is a cron job continuously scanning the database really a good idea?\""
            }
        ]
    },
    {
        "type": "heading",
        "level": 2,
        "content": [
            {
                "text": "Kafka"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Instead of scanning the database repeatedly, we could push failed notifications to Kafka and let the application consume and retry them."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "System components now: code changes and Kafka setup.",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "But Kafka is not meant to be used as long-term persistent storage. Messages can be deleted after a retention period, such as 7 days."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "So I brought the database back again to store failed notifications safely."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "System components now: code changes, Kafka setup, and database table changes.",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "heading",
        "level": 2,
        "content": [
            {
                "text": "When One Client Becomes a Bottleneck"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Then another scenario hit me."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "What if one client becomes a hotspot? What if their server is down for days instead of hours?"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "In that case, retries for that single client could keep piling up. Meanwhile, other clients—whose servers might recover within minutes or hours—could get blocked behind this backlog."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "This introduced two new questions. First, after how many attempts should we stop retrying? Second, how do we make sure smaller clients are not affected when one big client keeps failing?"
            }
        ]
    },
    {
        "type": "heading",
        "level": 3,
        "content": [
            {
                "text": "Adding Client-Wise Queues"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "To handle this, I designed an in-memory, client-wise queue inside the application. Each client would have its own queue with a fixed capacity, for example,\n                    10 entries."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "The logic was simple: consume Kafka events only when the client's queue is not full."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "This way, hotspot clients would naturally slow down, while other clients would still be able to receive notifications without getting blocked."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "System components now: code changes, in-memory client-wise queues, Kafka setup, and database table changes.",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "The overall "
            },
            {
                "text": "architecture"
            },
            {
                "text": " seemed capable of handling most worst-case scenarios I could think of."
            }
        ]
    },
    {
        "type": "heading",
        "level": 2,
        "content": [
            {
                "text": "When My Design Met Reality"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Now it was time to present the design to the CTO and get approval before implementation."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "During the meeting, I explained my entire thought process. I talked through every edge case I had considered and showed the complete system using flow and block diagrams. Kafka, database, queues, limits, and future scenarios—everything was covered."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "CTO then asked me two questions: "
            },
            {
                "text": "how many clients have complained so far",
                "marks": [
                    "bold"
                ]
            },
            {
                "text": ", and "
            },
            {
                "text": "how frequently does this happen?",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "I said there are clients facing this issue. He asked "
            },
            {
                "text": "\"what's the exact number?\"",
                "marks": [
                    "bold"
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "I had no answers."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Those flow diagrams, block diagrams, and code snippets on the presentation screen seemed like wasted effort. "
            }
        ]
    },
    {
        "type": "heading",
        "level": 3,
        "content": [
            {
                "text": "What Was Missing: Data"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Before designing anything, he told me to go and look at the data—specifically, OpenSearch logs, as far back as we could."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "He asked me to extract four metrics by answering these questions:"
            }
        ]
    },
    {
        "type": "list",
        "ordered": true,
        "items": [
            {
                "content": [
                    {
                        "text": "Which clients have actually failed in the past year?"
                    }
                ]
            },
            {
                "content": [
                    {
                        "text": "How often did each client fail?"
                    }
                ]
            },
            {
                "content": [
                    {
                        "text": "How long did their servers usually take to recover?"
                    }
                ]
            },
            {
                "content": [
                    {
                        "text": "Which HTTP status codes were most common per client?"
                    }
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Those metrics would be:"
            }
        ]
    },
    {
        "type": "list",
        "ordered": true,
        "items": [
            {
                "content": [
                    {
                        "text": "number_of_failed_clients",
                        "marks": [
                            "bold"
                        ]
                    }
                ]
            },
            {
                "content": [
                    {
                        "text": "frequency_of_failure_per_client",
                        "marks": [
                            "bold"
                        ]
                    }
                ]
            },
            {
                "content": [
                    {
                        "text": "avg_time_to_recover_per_client",
                        "marks": [
                            "bold"
                        ]
                    }
                ]
            },
            {
                "content": [
                    {
                        "text": "http_status_distribution_per_client",
                        "marks": [
                            "bold"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Only after having this data, he said, could we meaningfully decide the architecture. Without data, debating designs was pointless."
            }
        ]
    },
    {
        "type": "heading",
        "level": 2,
        "content": [
            {
                "text": "The Realization"
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "A few days later, I got assigned another task and "
            },
            {
                "text": "this task was moved to the backlog"
            },
            {
                "text": "."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "I think in most cases, to over-engineer something or to under-engineer "
            },
            {
                "text": "something"
            },
            {
                "text": " would be"
            },
            {
                "text": " a result of lack of data. "
            },
            {
                "text": "Looking back, I think I was just afraid of being wrong and that's what made me go deep into all those worst-case scenarios which I prepared for."
            }
        ]
    },
    {
        "type": "paragraph",
        "content": [
            {
                "text": "Having started with the data, following where it leads, and I would've built exactly what was needed."
            }
        ]
    }
];
