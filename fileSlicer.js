document.addEventListener("DOMContentLoaded", function(event) {
    let fileInput = document.getElementById('fileInput');

    fileInput.addEventListener("change", function (evt) {
        let selectedFile = fileInput.files[0];
        console.log("selectedFile:", selectedFile);
        let sliceSize = parseInt(document.getElementById('sliceSize').value, 10);

        let fileReader = new FileReader();
        let actualSliceSize = Number.POSITIVE_INFINITY;
        let position = 0;
        let counter = 0;
        while (actualSliceSize > 0) {
            let slice = selectedFile.slice(position, position + sliceSize);

            actualSliceSize = slice.size;
            let msg = "slice #" + counter + "   position:" + position + "   slice.size:" + slice.size;
            console.log(msg);
            ++counter;

            let div = document.createElement('div');
            div.innerText = msg;
            document.body.appendChild(div);

            position += actualSliceSize;
        }
    });
});
