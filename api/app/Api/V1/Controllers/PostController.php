<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Post;
use Dingo\Api\Routing\Helpers;

class PostController extends Controller
{
    use Helpers;

    public function index()
    {
        return Post::select('*')
            ->orderBy('created_at', 'DESC')
            ->get()
            ->toArray();
    }

    public function store(Request $request)
    {
        $post = new Post;

        $post->title = $request->get('title');
        $post->categories = $request->get('categories');
        $post->content = $request->get('content');

        if ($post->save())
            return $this->response->created();
        else
            return $this->response->error('could_not_create_post', 500);
    }

    public function show($id)
    {
        $post = Post::find($id);

        if (!$post)
            throw new NotFoundHttpException;

        return $post;
    }

    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        if (!$post)
            throw new NotFoundHttpException;

        $post->fill($request->all());

        if ($post->save())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_update_post', 500);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post)
            throw new NotFoundHttpException;

        if ($post->delete())
            return $this->response->noContent();
        else
            return $this->response->error('could_not_delete_post', 500);
    }

}
