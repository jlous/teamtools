function readSingleFile(e) {
    if (!e.target.files) {
        return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (loaded) {
        render(loaded.target.result);
    };
    reader.readAsText(file);
}

function render(logfile) {
    let indent = 0;
    let startTime;
    const lines = logfile.split('\n').map(line => {
        const found = line.match(/^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d,\d\d\dZ/);
        if (found){
            const time = Date.parse(found[0].replace(',','.'));
            startTime = startTime || time;
            indent = (time-startTime)/100;
        }
        return `<div style="padding-left: ${indent}px">${line}</div>`;
    });
    $("#file-content").html(lines.join('\n'));
}

$("#file-input").change(function(e) {
    readSingleFile(e);
});

$("#text-size").change(function() {
    $('#file-content').css("font-size", $(this).val()+"px");
});
