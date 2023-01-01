<!--個人プロフィール-->
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Profile</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
      </head>
      <body>
          <h1>個人プロフィール</h1>
          <div class='posts'>
            @foreach ($posts as $post)
                <div class='post'>
                  <h2 class='name'>{{ $post->name}}</h2>
                  <p class='email'>{{ $post->email}}</p>
                </div>
            @endforeach
          </div>
      </body>
  </html>