// ⚠️ 重要：部署完後端後，請把這裡改成 Hugging Face 提供給你的 API 網址
const BACKEND_URL = "[https://n-93-factory-safety-api.hf.space/api/report](https://你的帳號-你的Space名稱.hf.space/api/report)"; 

document.getElementById('submitBtn').addEventListener('click', async () => {
    const textInput = document.getElementById('reportInput').value.trim();
    if (!textInput) {
        alert("請輸入現場狀況後再通報！");
        return;
    }

    // 顯示載入中，隱藏上一次的結果
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('resultSection').classList.add('hidden');

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: textInput })
        });

        if (!response.ok) throw new Error("後端伺服器回應異常");

        const data = await response.json();

        // 渲染資料到畫面上
        document.getElementById('summaryText').innerText = data.summary;
        
        const sopList = document.getElementById('sopList');
        sopList.innerHTML = ""; // 清空舊的
        data.sop.forEach(step => {
            const li = document.createElement('li');
            li.innerText = step;
            sopList.appendChild(li);
        });

        // 顯示結果看板
        document.getElementById('resultSection').classList.remove('hidden');

    } catch (error) {
        alert("通報發生錯誤，請檢查後端連線！");
        console.error(error);
    } finally {
        // 隱藏載入中
        document.getElementById('loading').classList.add('hidden');
    }
});