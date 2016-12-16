// This is a JavaScript file

document.addEventListener('DOMContentLoaded',onDOMContentLoaded,false); 
function onDOMContentLoaded(){
    console.log('DOMContentLoaded');
    
}

window.addEventListener('load', onload,false); 
function onload(){
    console.log('load');    
}

document.addEventListener("resume", onResume, false);
function onResume() {
    console.log('resume');
}

//このイベントこないけど何故か動く
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    // Now safe to use device APIs
    console.log('deviceready');
}

// Onsen UIを使用している場合
ons.ready(function() {
    console.log("ons-ready");
    load_info();
    try_tutwlan_connection();
});

document.addEventListener("pause", onPause, false);
function onPause() {
    console.log('pause');
    save_info();

}

// Platform specific overrides will be placed in the merges folder versions of this file
function change() {
    console.log("change");

    var url = document.getElementById("url").value;
    if (url.match("https://netar2.imc.tut.ac.jp"))
        url = "https://netar1.imc.tut.ac.jp/upload/custom/tutwlan_cap/tutwlan-login.html ";
    else url = "https://netar2.imc.tut.ac.jp/upload/custom/tutwlan_cap/tutwlan-login.html";

    document.getElementById("url").value = url;
    ////iframeのリンク先変更
    document.getElementById("iframe").setAttribute('src', url);//jQueryの方法だとうまくいかん
    
}
function login() {
    console.log("login");
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //iframeのuserにフォーカス(エミュではだめっぽいけど実機で動く)
    //document.getElementById("iframe").contentWindow.document.getElementById("user").focus();
    document.getElementById("iframe").contentWindow.document.getElementById("user").value=username;
    document.getElementById("iframe").contentWindow.document.getElementById("password").value=password;
    document.getElementById("iframe").contentWindow.document.getElementById("regform").submit();
    save_info();
    //キーイベントなら
    //alt+u
    //ユーザ名
    //alt+p
    //パスワード
    //Enter
}

function try_tutwlan_connection()
{
    console.log("try_tutwlan_connection");
    
    var timer=setInterval(function(){        
        var iframe_url=null;
        var url="https://netar2.imc.tut.ac.jp/upload/custom/tutwlan_cap/tutwlan-login.html";
        
        if(iframe_url==null)document.getElementById("iframe").setAttribute('src', url);//最初
        else if(iframe_url.match(url)){//netar2でタイム・アウトした場合
            url="https://netar1.imc.tut.ac.jp/upload/custom/tutwlan_cap/tutwlan-login.html";
            document.getElementById("iframe").setAttribute('src', url);
            document.getElementById("url").value=url;
        }
        else{
            url="error.html";
            document.getElementById("iframe").setAttribute('src', url);
            document.getElementById("url").value=url;
        }
        document.getElementById("iframe").onload = function(){
            clearInterval(timer);
            console.log("iframe_onload_"+url);
        }
        console.log("try_"+url);
    },1500);//1.5secごとにfunctionを呼び出す
}

function load_info(){//ユーザ名とパスワードのロード
    
    console.log("load_info");
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    
    if(username!=null){
        document.getElementById("username").value=username;
        console.log('load_username');
    }
    if(password!=null){
        document.getElementById("password").value=password;
        console.log('load_password');
    }
}

function save_info(){//ユーザ名とパスワードのセーブ
    
    console.log("save_info");
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value
    
    if(username!=null){
        localStorage.setItem('username', username);
        console.log('save_username');
    }
    if(password!=null){
        localStorage.setItem('password', password);
        console.log('save_password');
    }
}
