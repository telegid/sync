CREATE TABLE IF NOT EXISTS channel_raw_content (
    id serial,

    release_date varchar NOT NULL,
    channel_id varchar NOT NULL,
    content text NOT NULL,

    PRIMARY KEY ("id"),
    UNIQUE ("channel_id", "release_date")
);