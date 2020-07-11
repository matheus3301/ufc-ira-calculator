var grades = [];

var checkbox = function(){

    $("input[type='checkbox']").click(function() {
        console.log("Clique")

        let value = $(this).attr('value');
        let point = $("#nota");

        if(document.getElementById(value).checked){
            console.log("checking");
            point.attr("disabled",true);

            if(value == "tranca"){
                document.getElementById("falta").checked = false;
            }else{
                document.getElementById("tranca").checked = false;
            }
        }else{
            console.log("unchecking");
            point.removeAttr("disabled");

        }
        
        
    });
};

var addGrade = function(e){
    e.preventDefault();

    let grade = parseFloat($("#nota").val());
    let semester = parseInt($("#semestre").val());
    let credits = parseInt($("#credito").val());
    
    let locked = document.getElementById("tranca").checked;
    let miss =  document.getElementById("falta").checked;

    if(miss){
        grade = 0;
    }

    let obj = {
        semester,
        credits,
        grade,
        locked
    }

    grades.push(obj);

    document.getElementById("formCadeira").reset();

    renderTable();
    console.log(grades);
}

var renderTable = function(){
    let tableContent = $("#table-content");

    if(!grades.length){
        tableContent.html("<tr><td colspan='3'><center><strong>Não há notas ...</strong></center></td></tr>");
    }else{
        tableContent.html("");

        grades.forEach(function(val){
            tableContent.append(`<tr><td>${val.semester}º</td><td>${val.credits * 16}hrs</td><td>${ val.locked ? "<strong>TRANCADA</strong>" : val.grade}</td></tr>`);
        });
    }
}

var calculateIndividual = function(){

    console.log("testing");

    let t = 0;
    let c = 0;

    let sigA = 0;
    let sigB = 0;


    grades.forEach(function(val){
        if(val.locked){
            t += val.credits * 16;
        }else{
            sigA += (Math.min(6,val.semester) * (val.credits * 16) * val.grade);
            sigB += (Math.min(6,val.semester) * (val.credits * 16));

        }

        c += val.credits * 16;



    });

    let ans = (1 - (0.5*t)/c) * sigA/sigB;
    return ans;
}

var renderIndividual = function(){
    let ira = calculateIndividual();

    $("#indivualResult").html(ira.toPrecision(3));
}

checkbox("opcao");
renderTable();