import {prisma} from "@/src/db/prisma";
import moment from "moment";

async function createUser(
    pseudo: string,
    email: string,
    password: string
) {
    await prisma.user.create({
        data: {
            name: pseudo,
            email: email,
            hashedPassword: password,
            posts: [],
            posts_saved: [],
            posts_liked: [],
            posts_readed: [],
            description: null,
            location: null,
            profile_picture_uli: null,
            Comment: []
        }
    })
}

async function createPost(
    slug: number,
    title: string,
    body: string,
    user_id: string,
    picture_uli: string
) {
    let date = new Date();
    let new_post = await prisma.post.create({
        data: {
            slug: slug,
            userId: user_id,
            title: title,
            body: body,
            tags: [],
            picture_uli: picture_uli,
            date: date.toISOString()
        }
    })
    await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            posts: {
                push: new_post.id

            }
        }
    })

}

async function createComment(
    body: string,
    user_id: string,
    post_id: string,
) {
    let date = moment();
    let new_comment = await prisma.comment.create({
        data: {
            body: body,
            userId: user_id,
            postId: post_id,
            date: date.toISOString()
        }
    })

}

export default async function home() {
    createComment("J'adore, merci 00h37 !", "660679344a6289e3c5fe43da", "66089eb6828922e3f56e256c")
    return (
        <div>script</div>
    )
}