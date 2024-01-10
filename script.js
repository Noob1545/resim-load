let dizi = []
let buton = document.getElementById("buton")
buton.style.cursor = "pointer"
function file(){
    let file = buton.files[0]
    const reeder = new FileReader()
    reeder.onload = function(e){
        let url = e.target.result
        let create = document.createElement("img")
        create.src = url
        buton.value = ""
        create.style.cursor = "pointer"
        create.style.borderRadius = "5px"
        create.style.padding = "10px 10px"
        create.onclick = function(){
            let secenek = confirm("bu öğeyi silmek istediğinden emin misin?")
            if(secenek){
                create.remove()
                dizi.splice(dizi.indexOf(create.src), 1)
                console.log(dizi);
                let stringfy = JSON.stringify(dizi)
                localStorage.setItem('dizi', stringfy)
                let parse = JSON.parse(localStorage.getItem('dizi') || [])
            }
        }
        create.oncontextmenu = function(event){
            event.preventDefault()
            if(event.ctrlKey){
                navigator.clipboard.writeText(url)
                .then(function(){
                    alert("resmin linki panoya kopyalandı!")
                })
                .catch(function(){
                    alert("linki kopyalarken bir hata oluştur lütfen sayfayı yenileyip tekrar deneyin")
                })
            }
            else{
                const url = create.src; // İndirilecek PNG dosyasının URL'si
    
                const link = document.createElement('a');
                link.href = url;
                link.download = 'image.png'; // İndirilen dosyanın adı (opsiyonel olarak belirtilebilir)
                link.target = '_blank';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
        document.getElementById("imgs").append(create)
        dizi.push(url)
        localStorage.setItem("dizi",JSON.stringify(dizi) || [])
    }
    reeder.readAsDataURL(file)
}
window.addEventListener("load",function(){
    let parse = JSON.parse(localStorage.getItem('dizi') || [])
        for(let i = 0; i < parse.length; i++){
            let create = document.createElement("img")
            create.src = parse[i]
            create.style.cursor = 'pointer'
            create.style.borderRadius = "10px"
            create.style.borderColor = "red"
            create.style.padding = "10px 10px"
            create.onclick = function(){
                let secenek = confirm("bu öğeyi silmek istediğinden emin misin?")
                if(secenek){
                    create.remove()
                    dizi.splice(dizi.indexOf(create.src), 1)
                    console.log(dizi);
                    let stringfy = JSON.stringify(dizi)
                    localStorage.setItem('dizi', stringfy)
                    let parse = JSON.parse(localStorage.getItem('dizi') || [])
                }
            }
            
            create.oncontextmenu = function(event){
                event.preventDefault()
                if(event.ctrlKey){
                    navigator.clipboard.writeText(create.src)
                .then(function(){
                    alert("resmin linki panoya kopyalandı!")
                })
                .catch(function(){
                    alert("linki kopyalarken bir hata oluştur lütfen sayfayı yenileyip tekrar deneyin")
                })
                }
                else{
                    const url = create.src; // İndirilecek PNG dosyasının URL'si
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'image.png'; // İndirilen dosyanın adı (opsiyonel olarak belirtilebilir)
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
            document.getElementById("imgs").append(create)
        }
        let imgs = document.querySelectorAll("img").forEach(function(event){dizi.push(event.src)})
})