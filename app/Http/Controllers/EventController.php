<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function store(Request $request) 
    {
          $event = new Event;
          // 日付に変換。JavaScriptのタイムスタンプはミリ秒なので秒に変換 
          $event->start_date = date('Y-m-d', $request->input('start_date') / 1000); 
          $event->end_date = date('Y-m-d', $request->input('end_date') / 1000); 
          $event->name = $request->input('name');
          $event->save();
    }
}
