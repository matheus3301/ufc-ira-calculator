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

    let grade = $("#nota").val();
    let semester = $("#semestre").val();
    let credits = $("#credito").val();

    let obj = {
        semester,
        credits,
        grade
    }

    grades.push(obj);

    document.getElementById("formCadeira").reset();

    renderTable();

}

var renderTable = function(){
    let tableContent = $("#table-content");

    if(!grades.length){
        tableContent.html("<tr><td colspan='3'><center><strong>Não há notas ...</strong></center></td></tr>");
    }else{
        tableContent.html("");

        grades.forEach(function(val){
            tableContent.append(`<tr><td>${val.semester}º</td><td>${val.credits * 16}hrs</td><td>${val.grade}</td></tr>`);
        });
    }
}

checkbox("opcao");
renderTable();