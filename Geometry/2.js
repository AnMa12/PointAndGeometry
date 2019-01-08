function punct(x,y,i)
{
	this.x=x;
	this.y=y;
	this.indice=i;
}
function determinant(a,b,c)
{
    var rez=0;
    rez=a.x*(b.y-c.y)- a.y*(b.x-c.x) + (b.x*c.y - b.y*c.x);
    return rez;
}
function dist(a1,b1)
{
    var m=Math.sqrt((a1.x-b1.x)*(a1.x-b1.x)+(a1.y-b1.y)*(a1.y-b1.y));
    return m;
}
window.onload=function(){
	var n,i=0;
	var v=new Array(),m;
	var canvas=document.getElementById("input");
	var ctx=canvas.getContext("2d");
	ctx.lineWidth = 2;
	document.getElementById("nr").onchange=function(){n=this.value;};
	var ok=0;
	document.getElementById("input").onclick=function()
	{
		if(i<=n && ok==0)
		{
			var x = event.clientX-10; 
			var y =( event.clientY-10);
		    v[i++]=new punct(x,-y,i);
			if(i==0)
			ctx.moveTo(x,y);
		    else {ctx.lineTo(x,y); ctx.stroke();
			if(i==n) {ok=1;  ctx.lineTo(v[0].x,-v[0].y); ctx.stroke();}}
		}
		else if(i>=n && ok==1)
		{ 

		  var x = event.clientX-10; 
		  var y = (event.clientY-10);
		  m=new punct(x,-y,i);
		  ctx.fillRect(x,y,5,5);
		  this.onclick=function(){};
          //calcul
		  var ok_int = 1;
          var det = 0;
          var ok_lat = 0;
         if(n == 2)
         {
         if(dist(v[0], m) + dist(v[1], m) <= dist(v[0],v[1])+0.1 && dist(v[0], m) + dist(v[1], m) >= dist(v[0],v[1])-0.1)
            alert("Punctul este pe dreapta");
         else
            alert("Punctul nu este pe dreapta");
         }
         else
        {
        for(i = 0; i < n; i++)
          {
            if(i==n-1)
                j=0;
            else j=i+1;
            if(determinant(v[i],v[j],m) < 0)
                ok_int = 0;
			ctx.moveTo(v[i].x,-v[i].y);
			ctx.lineTo(m.x,-m.y);
			ctx.stroke();
			ctx.moveTo(v[j].x,-v[j].y);
			ctx.lineTo(m.x,-m.y);
			ctx.stroke();
			
			
          }
		for(i = 0; i < n; i++)
		{
		  if(i<=n-2)
		    {if(dist(v[i], m) + dist(v[i+1], m) <= dist(v[i],v[i+1])+0.07 && dist(v[i], m) + dist(v[i+1], m) >= dist(v[i],v[i+1])-0.07)
		    ok_lat = 1;}
	      else
		    {if(dist(v[i], m) + dist(v[0], m) <= dist(v[i],v[0])+0.07 && dist(v[i], m) + dist(v[0], m) >= dist(v[i],v[0])-0.07)
			ok_lat = 1;}
	    }

        if(ok_lat == 1)
            alert("Este pe latura");
        else if(ok_int == 1)
            alert("Este in interior");
        else
            alert("Este in exterior");
    }
	    }
	}

}
