import '@fullcalendar/core/vdom'; // for Vite 
import { Calendar } from "@fullcalendar/core"; 
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // 追記
import axios from 'axios';

let click = 0;
let oneClickTimer;


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
                .catch(()=> {
                    // バリデーションエラーなど
                    alert("登録に失敗しました");
                });
        }
    },
    events: function (info, successCallback, failureCallback) {
        axios
            .post("/dashboard/event", {
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

    eventDrop: function(info) {
        const id = info.event._def.publicId; // イベントのDBに登録されているidを取得
        axios
            .post(`/dashboard/${id}`, {
                start_date: info.event._instance.range.start.valueOf(), 
                end_date: info.event._instance.range.end.valueOf(),
            })
            .then(() => {
                alert("登録に成功しました!");
            })
            .catch(() => {
                // バリデーションエラーなど 
                alert("登録に失敗しました");
            });
    },
    
    
    eventClick: function(info) {
        
        click++;
        if (click === 1) {
            
        } else if (click === 2) {
            clearTimeout(oneClickTimer); // クリック1回時の処理を削除
            click = 0;
            
            // 削除処理
            if(!confirm('イベントを削除しますか?')) return false;
            
            const id = info.event._def.publicId; 
            axios
                .post(`/dashboard/${id}/delete`)
                .then(() => {
                    info.event.remove(); // カレンダーからイベントを削除
                    alert("削除に成功しました!");
                })
                .catch(() => {
                    alert("削除に失敗しました");
                });
        }
    },
    
});
        

// レンダリング 
calendar.render();
