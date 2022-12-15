<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('create_users', function (Blueprint $table) {
            $table->increments('id');    //ID 自動増分
            $table->char('name', 20);    // 名前
            $table->string('email', 50); // メールアドレス
            $table->string('password');  //パスワード
            $table->date('create_date'); // 作成日
            $table->date('start_date'); // 開始日
            $table->date('end_date'); // 終了日
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('create_users');
    }
};
