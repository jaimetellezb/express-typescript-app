import { Response, Request } from "express";
import { connect } from "../database";
import { Post } from "../interface/post.interface";

export async function getPosts(req: Request, res: Response) {
    const conn = await connect();
    //como la consulta se demora entonces colocamos await también 

    const posts = await conn.query('SELECT * FROM posts');

    console.log(posts);
    // respuesta
    res.json(posts);
}

export async function createPosts(req: Request, res: Response) {
    const newPost: Post = await req.body;
    console.log(newPost);
    const conn = await connect();
    await conn.query('INSERT INTO posts SET ?', [newPost]);
    return res.json({
        message: 'Post Created'
    })
}

export async function getPost(req: Request, res: Response): Promise<Response> {
    const id = req.params.postId;

    const conn = await connect();
    const posts = await conn.query('SELECT * FROM posts WHERE id = ?', [id]);

    return res.json(posts);
}


export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId;

    const conn = await connect();
    const posts = await conn.query('DELETE FROM posts WHERE id = ?', [id]);

    return res.json('Post DELETED');
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.postId;
    const updatePost: Post = req.body;

    const conn = await connect();
    const posts = await conn.query('UPDATE posts SET ? WHERE id = ?', [updatePost, id]);

    return res.json('Post UPDATED');
}