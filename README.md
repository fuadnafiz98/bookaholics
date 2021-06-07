# Hashnode Hackathon

## Tech Stack

- next.js
- node.js
- express.js
- passport.js
- harper.db


## Database Schema 

### Bytes

- quotes
  - add new quote
    - book name (optional)
    - author name
    - quote
    - [optional] upload image -> text from image
  - *db schema*
    - user_id
    - book_name
    - author_name
    - quote
    - image_url
    - love_count
    - created_at

```json
{
  user_id: "1",
  book_name: "deep work",

}
```

### Threads

#### Schema

- topic_name
- user_id
- date
- view_count
- comment_count
- upvote_count
- downvote_count


```
|  u  | Topic name  
|  +2 | 
|  d  | by username @ date & time . 11 comments . 200 views
```





