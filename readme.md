# web-final-project-from-Xiaohu Shu
This is the final project of CS-C3170 - Web Software Development， which provides a life tracker server-side-render software.
Student: Xiaohu Shu

## Online Demo (Heroku)
https://wsd-project-life-tracker.herokuapp.com/

## Run Locally
### 1. Database schema
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE morning_report (
    id SERIAL PRIMARY KEY,
    report_date DATE not null, 
    sleep_duration  INT CHECK (sleep_duration >= 0),
    sleep_quality INT CHECK (sleep_quality >= 1 and sleep_quality <=5),
    sleep_mood INT CHECK (sleep_mood >= 1 and sleep_mood <=5),
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE evening_report (
    id SERIAL PRIMARY KEY,
    report_date DATE not null, 
    exercise_duration  INT CHECK (exercise_duration >= 0),
    study_duration  INT CHECK (study_duration >= 0),
    eat_quality INT CHECK (eat_quality >= 1 and eat_quality <=5),
    general_mood INT CHECK (general_mood >= 1 and general_mood <=5),
    user_id INTEGER REFERENCES users(id)
);

```

### 2. Edit db settings in "./config/config.js"

### 3. Run the app:

```shell
deno run --allow-read --allow-env --allow-net --unstable app.js
```