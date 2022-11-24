import '@fullcalendar/core/vdom'; // for Vite 
import { Calendar } from "@fullcalendar/core"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 追記
import axios from 'axios';


// idがcalendarのDOMを取得
var calendarEl = document.getElementById("calendar");
// カレンダーの設定
let calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin], // 追記
    //plugins: [dayGridPlugin],
    
// 最初に表示させる形式 
    initialView: "dayGridMonth",
    
// ヘッダーの設定(左/中央/右)
    headerToolbar: {
        left: "prev,next today", 
        center: "title",
        right: "",
    },
    
    selectable: true, // 複数日選択可能 
    select: function (info) { // 選択時の処理
        console.log(info)
        
        const eventName = prompt("イベントを入力してください");
        
        // 入力された時に実行される 
        if (eventName) {
            axios
                .post(route('event.store'), {
                    start_date: info.start.valueOf(),
                    end_date: info.end.valueOf(),
                    name: eventName,
                })
                .then(() => {
                    // イベントの追加 
                    calendar.addEvent({
                        title: eventName, // 表示内容 
                        start: info.start, // イベント開始 
                        end: info.end, // イベント終了 
                        allDay: true, // 終日かどうか
                    });
                })
                .catch(() => {
                    // バリデーションエラーなど
                    alert("登録に失敗しました");
                });
        }
    },
    events: function (info, successCallback, failureCallback) {
        axios
            .post("/calendar/event", {
                start_date: info.start.valueOf(),
                end_date: info.end.valueOf(),
            })
            .then(response => {
                // 追加したイベントを削除 
                calendar.removeAllEvents();
                // カレンダーに読み込み 
                successCallback(response.data);
            })
            .catch(() => {
                // バリデーションエラーなど
                alert("取得に失敗しました");
            });
    },
});
// レンダリング 
calendar.render();
