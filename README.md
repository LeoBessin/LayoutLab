
# Layout Lab

This is a school project for [@bdernier](https://github.com/bdernier)'s FullStack course.

## Authors

- [@LeoBessin](https://www.github.com/LeoBessin)


## Tech Stack

**Client:** NextJs, Prisma, TailwindCSS

**Server:** Node, MongoDb


![Logo](https://raw.githubusercontent.com/LeoBessin/LayoutLab/main/public/images/big-logo.png)

## Color Reference

| Accent Glow Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| 100 | ![#f24e1e](https://via.placeholder.com/10/f24e1e?text=+) #f24e1e |
| 200 | ![#ff7262](https://via.placeholder.com/10/ff7262?text=+) #ff7262 |
| 300 | ![#a259ff](https://via.placeholder.com/10/a259ff?text=+) #a259ff |
| 400 | ![#1abcfe](https://via.placeholder.com/10/1abcfe?text=+) #1abcfe |
| 500 | ![#0acf83](https://via.placeholder.com/10/0acf83?text=+) #0acf83 |

| Accent Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| 100 | ![#666666](https://via.placeholder.com/10/666666?text=+) #666666 |
| 200 | ![#f7f7f7](https://via.placeholder.com/10/f7f7f7?text=+) #f7f7f7 |

| Background Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| 100 | ![#1a1a1a](https://via.placeholder.com/10/1a1a1a?text=+) #1a1a1a |
| 200 | ![#292929](https://via.placeholder.com/10/292929?text=+) #292929 |
| 300 | ![#404040](https://via.placeholder.com/10/404040?text=+) #404040 |

| Primary Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| 100 | ![#333333](https://via.placeholder.com/10/333333?text=+) #333333 |
| 200 | ![#5c5c5c](https://via.placeholder.com/10/5c5c5c?text=+) #5c5c5c |
| 300 | ![#b9b9b9](https://via.placeholder.com/10/b9b9b9?text=+) #b9b9b9 |

| Text Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| 100 | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) #ffffff |
| 200 | ![#e0e0e0](https://via.placeholder.com/10/e0e0e0?text=+) #e0e0e0 |


## Features

- Create/edit account
- Create/read/like/save posts
- Create/read comments


## Installation

Install LayoutLab with npm

```bash
  npm install
  npx prisma generate
  npx prisma db push
```

create a .env file and add :

```env
DATABASE_URL=<mongo_db_connection_string>
URL="http://localhost:3000"
NEXTAUTH_SECRET=<random_string>
```

## Page design

### Home
![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/home-page.png)

### Sign in
![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/sign-in.png)

### Dashboard
![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/dashboard.png)

### Create post
![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/create-post.png)

### Post detail
![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/post-detail.png)

### Comments / Footer
![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/comments-footer.png)

### User detail
![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/user-detail.png)


## Demo

![](https://github.com/LeoBessin/LayoutLab/blob/main/public/images/demo/demo-1.gif)


## 🚀 About Me
I'm a full stack (student) developer...

