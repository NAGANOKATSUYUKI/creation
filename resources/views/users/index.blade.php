<!--個人プロフィール-->
<!DOCTYPE html>
<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ Auth::user()->name .('さんの個人プロフィール') }}
        </h2>
    </x-slot>
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
        <head>
            <meta charset="utf-8">
            <title>Profile</title>
            <!-- Fonts -->
            <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
          </head>
          <body>
              <div class='posts'>
                @foreach ($posts as $post)
                    <div class='post'>
                      <h2 class='name'>{{ $post->name }}</h2>
                      <p class='email'>{{ $post->email }}</p>
                      <p class='password'>{{ $post->password }}</p>
                    </div>
                @endforeach
              </div>
          </body>
      </html>
</x-app-layout>