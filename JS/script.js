kolmast=1;
				kolmast=prompt("Введите количество мастей 1 или 2");
				
				schet=document.getElementById("Schet");
				
				Reg=/Rubashka/;
				T=new RegExp;
				T[13]=/K\(t\)/;
				T[12]=/Q\(t\)/;
				T[11]=/J\(t\)/;
				T[10]=/D\(t\)/;
				T[9]=/9\(t\)/;
				T[8]=/8\(t\)/;
				T[7]=/7\(t\)/;
				T[6]=/6\(t\)/;
				T[5]=/5\(t\)/;
				T[4]=/4\(t\)/;
				T[3]=/3\(t\)/;
				T[2]=/2\(t\)/;
				T[1]=/1\(t\)/;
				
				T2=new RegExp;
				T2[13]=/K\(ch\)/;
				T2[12]=/Q\(ch\)/;
				T2[11]=/J\(ch\)/;
				T2[10]=/D\(ch\)/;
				T2[9]=/9\(ch\)/;
				T2[8]=/8\(ch\)/;
				T2[7]=/7\(ch\)/;
				T2[6]=/6\(ch\)/;
				T2[5]=/5\(ch\)/;
				T2[4]=/4\(ch\)/;
				T2[3]=/3\(ch\)/;
				T2[2]=/2\(ch\)/;
				T2[1]=/1\(ch\)/;
				
				
				
				kol=0;//изспользуеться в функции Add для огранисение раздачи карт
				mas= new Array();//Массив карт которые передвигаються 
				number=1000;//Принимает номер узла на который нажал
				array=new Array();//Массив картинок
				img=new Image();
				
				
				j=0;
				while(j<104){//заполнение массива картами
				for(i=1;i<10;i++){
					img[j]=new Image();
					img[j].src="Karts//"+i+"(t).png";
					array[j]=img[j++];
					if(kolmast==2){
					img[j]=new Image();
					img[j].src="Karts//"+i+"(ch).png";
					array[j]=img[j++];}
				}
					img[j]=new Image();
					img[j].src="Karts//D(t).png";
					array[j]=img[j++];
					img[j]=new Image();
					img[j].src="Karts//J(t).png";
					array[j]=img[j++];
					img[j]=new Image();
					img[j].src="Karts//Q(t).png";
					array[j]=img[j++];
					img[j]=new Image();
					img[j].src="Karts//K(t).png";
					array[j]=img[j++];
					if(kolmast==2){
					img[j]=new Image();
					img[j].src="Karts//D(ch).png";
					array[j]=img[j++];
					img[j]=new Image();
					img[j].src="Karts//J(ch).png";
					array[j]=img[j++];
					img[j]=new Image();
					img[j].src="Karts//Q(ch).png";
					array[j]=img[j++];
					img[j]=new Image();
					img[j].src="Karts//K(ch).png";
					array[j]=img[j++];}
				}
				
				
				Block1 = document.getElementById('block1');
				Block2 = document.getElementById('block2');
				Block3 = document.getElementById('block3');
				Block4 = document.getElementById('block4');
				Block5 = document.getElementById('block5');
				Block6 = document.getElementById('block6');
				Block7 = document.getElementById('block7');
				Block8 = document.getElementById('block8');
				Block9 = document.getElementById('block9');
				Block10 = document.getElementById('block10');
				
				BlockId=new Array(Block1,Block2,Block3,Block4,Block5,Block6,Block7,Block8,Block9,Block10)
		
		
			function open(){
					for(j=0;j<10;j++){//Открытие карты
			if(Reg.test(BlockId[j].children[BlockId[j].children.length-1].src)&&BlockId[j].children[BlockId[j].children.length-1].src!=""){
				do{
				rand=Math.floor(Math.random()*(104));
				}while(array[rand]==undefined)
				a=BlockId[j].children[BlockId[j].children.length-1].style.top;//top текущего элемента
				a=a.substring(0, a.length-1 );//убераем х
				a=a.substring(0, a.length - 1);//убераем р
				array[rand].style.top=a+"px";
				array[rand].setAttribute('onmousedown','actionDOWN(this)');
				array[rand].setAttribute('name',BlockId[j].className);
				array[rand].style.zIndex = 1000;
				if(BlockId[j].children.length-1==0){
				BlockId[j].children[BlockId[j].children.length-1].src="";
				BlockId[j].children[BlockId[j].children.length-1].style.width="80px";
				BlockId[j].children[BlockId[j].children.length-1].style.height="110px";
				BlockId[j].appendChild(array[rand]);
				}else
				{BlockId[j].removeChild(BlockId[j].children[BlockId[j].children.length-1]);
				BlockId[j].appendChild(array[rand]);}
				delete array[rand];
			}
			}
			}
		
		
				
			function positionCard(){//Добавление карт
			for(i=0;i<10;i++){ //Цыкл для всех блоков
				do{
				rand=Math.floor(Math.random()*(104));
				}while(array[rand]==undefined)
				a=BlockId[i].children[BlockId[i].children.length-1].style.top;//top текущего элемента
				a=a.substring(0, a.length-1 );//убераем х
				a=a.substring(0, a.length - 1);//убераем р
				if(BlockId[i].children[BlockId[i].children.length-1].style.top=="0px"&&BlockId[i].children[BlockId[i].children.length-1].style.height=="110px")
				{
				array[rand].style.top=0+"px";
				array[rand].style.left=0+"px";
				array[rand].setAttribute('onmousedown','actionDOWN(this)');
				array[rand].setAttribute('name',i+1);
				array[rand].style.zIndex = 1000;
				BlockId[i].appendChild(array[rand]);
				delete array[rand];
				}else{
				a++;//делаем переменую числоваго типа
				if(Reg.test(BlockId[i].children[BlockId[i].children.length-1].src))
				a+=9;
				else
					a+=30;
				array[rand].style.top=a+"px";
				array[rand].setAttribute('onmousedown','actionDOWN(this)');
				array[rand].setAttribute('name',i+1);
				array[rand].style.zIndex = 1000;
				BlockId[i].appendChild(array[rand]);
				delete array[rand];}
				}
				kol++;
				if(kol>5){ Add.style.display="none"; return;}
			}
			positionCard();
			
			kolkart=0;
			q=0;
			
			function Proverka(Block){
				num=0;
					kol1=0;
					kol2=0;
					p=12;
					for(j=0;j<=Block.children.length-1;j++){
						if(T[13].test(Block.children[j].src)){num=j;kol1++;}
					}
					
					if(T[13].test(Block.children[num].src)){
					for(j=num+1;j<=Block.children.length-1;j++){
						if(T[p].test(Block.children[j].src)&&p>0){kol1++;p--;}
						else
							kol1=0;
					}
					if(kol1==13){
					q+=30;
						for(m=num;m<=Block.children.length;m){
							Block.children[Block.children.length-1].style.top=schet.style.top;
							Block.children[Block.children.length-1].style.left=q+"px";
							Block.children[Block.children.length-1].setAttribute('onmousedown','');
							Block.children[Block.children.length-1].setAttribute('name',"0");
							Block.children[Block.children.length-1].style.zIndex = 1000;
							schet.appendChild(Block.children[Block.children.length-1]);
							}
						kolkart++;
					}
				}
				p=12;
				num=0;
				for(j=0;j<=Block.children.length-1;j++){
						if(T2[13].test(Block.children[j].src)){num=j;kol2++;}
					}
					
					if(T2[13].test(Block.children[num].src)){
					for(j=num+1;j<=Block.children.length-1;j++){
						if(T2[p].test(Block.children[j].src)&&p>0){kol2++;p--;}
						else
							kol2=0;
					}
					if(kol2==13){
					q+=30;
						for(m=num;m<=Block.children.length;m){
							Block.children[Block.children.length-1].style.top=schet.style.top;
							Block.children[Block.children.length-1].style.left=q+"px";
							Block.children[Block.children.length-1].setAttribute('onmousedown','');
							Block.children[Block.children.length-1].setAttribute('name',"0");
							Block.children[Block.children.length-1].style.zIndex = 1000;
							schet.appendChild(Block.children[Block.children.length-1]);
							}
						kolkart++;
					}
				}
				open();
				if(kolkart==8)alert("Вы выиграли");
			}
			
			
			function BackCard(Block,mas){//возращение карты обратно или добавление в новый блок
			for(i=number;i<k;i++){
				a=Block.children[Block.children.length-1].style.top;//top текущего элемента
				a=a.substring(0, a.length-1 );//убераем х
				a=a.substring(0, a.length - 1);//убераем р
				if(Block.children[Block.children.length-1].style.top=="0px"&&Block.children[Block.children.length-1].style.height=="110px")
				{
				mas[i].style.top=a+"px";
				mas[i].style.left=0+"px";
				mas[i].style.zIndex =1000;
				mas[i].setAttribute('name',Block.className);
				Block.appendChild(mas[i]);
				}else{
				a++;//делаем переменую числоваго типа
				if(Reg.test(Block.children[Block.children.length-1].src))
				a+=9;
				else
					a+=30;
				mas[i].style.top=a+"px";
				mas[i].style.left=0+"px";
				mas[i].style.zIndex =1000;
				mas[i].setAttribute('name',Block.className);
				Block.appendChild(mas[i]);}
			}
			//Proverka(Block);
			}
			
			
			
			BlockX=new Array();
			for(j=0;j<10;j++){
			x=BlockId[j].style.left;
			x=x.substring(0, x.length-1 );
			x=x.substring(0, x.length - 1);
			BlockX[j]=x;
			}
			
			
			flag=1;
			function actionDOWN(obj){//функция передвижения карты
			
			if(obj.name=="1")n=0;
			if(obj.name=="2")n=1;
			if(obj.name=="3")n=2;
			if(obj.name=="4")n=3;
			if(obj.name=="5")n=4;
			if(obj.name=="6")n=5;
			if(obj.name=="7")n=6;
			if(obj.name=="8")n=7;
			if(obj.name=="9")n=8;
			if(obj.name=="10")n=9;
			
			//begin поверка на то можно ли перетаскивать карты или карту
			rez=0;
			pos=0;
			k=0;
			for(i=0;i<=BlockId[n].children.length-1;i++){
				if(obj==BlockId[n].children[BlockId[n].children.length-1]){number=BlockId[n].children.length-1;k=1}
				if(obj==BlockId[n].children[i]){
					number=i;
					for(p=1;p<14;p++)
					if(T[p].test(obj.src)||T2[p].test(obj.src)){
						pos=p;
					}
				}
			}
			if(k==0){
			for(i=number;i<BlockId[n].children.length-1;i++){
				if(T[pos].test(BlockId[n].children[i].src)){
					if(T[pos-1].test(BlockId[n].children[i+1].src)){
						if(pos>1)
						pos--;
					}else
						rez=1;
			}
			}
			for(i=number;i<BlockId[n].children.length-1;i++){
				if(T2[pos].test(BlockId[n].children[i].src)){
					if(T2[pos-1].test(BlockId[n].children[i+1].src)){
						if(pos>1)
						pos--;
					}else
						rez=1;
			}
			}
			};
			
			if(rez==1)return;
			//end
			oldY=new Array();
			oldX=0;
			
			k=BlockId[n].children.length;//Длина блока
			for(i=number;i<k;i++){
				mas[i]=BlockId[n].children[i];
				mas[i].style.zIndex =1001;
				oldY[i]=mas[i].style.top;
				//document.body.appendChild(mas[i]);
			}
			a=BlockId[n].style.left;//top текущего элемента
			a=a.substring(0, a.length-1 );//убераем х
			a=a.substring(0, a.length - 1);//убераем р
			//alert(a);
			
			document.onmousemove = function() {
			mas[number].style.left=event.pageX-(mas[number].offsetWidth / 2)-a + 'px';
			mas[number].style.top=event.pageY-mas[number].offsetHeight /4 + 'px';
			dop=5;
			for(i=number+1;i<k;i++){
			mas[i].style.left=event.pageX-(mas[i].offsetWidth / 2)-a + 'px';
			mas[i].style.top=event.pageY+dop+ 'px';
			dop+=30;
			}
			}
	
	
				
			mas[number].onmouseup = function() {
			document.onmousemove = null;
			mas[number].onmouseup = null;
			flag=1;
			for(l=0;l<10;l++){
			if((event.pageX>BlockX[l]&&event.pageX<BlockX[l+1])||event.pageX>BlockX[9]){
			for(i=1;i<13;i++){
					if(BlockId[l].children[BlockId[l].children.length-1].style.top=="0px"&&BlockId[l].children[BlockId[l].children.length-1].style.height=="110px"){
					BackCard(BlockId[l],mas);flag=0;
					}else
					if(T[i].test(mas[number].src)||T2[i].test(mas[number].src)){
					if(T[i+1].test(BlockId[l].children[BlockId[l].children.length-1].src)||T2[i+1].test(BlockId[l].children[BlockId[l].children.length-1].src)){
					BackCard(BlockId[l],mas);flag=0;
					Proverka(BlockId[l]);
					}}}
					
			}
			}
			
			if(flag==0){
				open();
				}
			if(flag==1){
			for(i=number;i<k;i++){
				mas[i].style.top=oldY[i];
				mas[i].style.left=oldX;
				mas[i].style.zIndex =1000;
				//document.body.appendChild(mas[i]);
			}}
			//BackCard(BlockId[n],mas);}
			}
			
			
			for(i=number;i<k;i++)
			mas[i].ondragstart = function() {
			return false;
			};
			}