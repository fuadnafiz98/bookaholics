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
    - quote [optional] upload image -> text from image
  - _db schema_
    - user_id
    - book_name
    - author_name
    - quote
    - image_url
    - love_count
    - created_at

```json
{
  "user_id": "1",
  "book_name": "deep work"
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

---

### Books

#### Schema

- book_id
- book_title
- book_author
- book_genre
- book_short_description
- book_thread_count
- book_img_url

### Books-Threads

- book_id
- thread_id

### Books-Genres

- book_id
- genre_id

### Genres

- genre_id
- genre_name
- genre_book_count