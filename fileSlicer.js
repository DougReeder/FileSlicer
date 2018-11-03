document.addEventListener("DOMContentLoaded", function(event) {
    let fileInput = document.getElementById('fileInput');

    fileInput.addEventListener("change", function (evt) {
        let selectedFile = fileInput.files[0];
        console.log("selectedFile:", selectedFile);
        let sliceSize = parseInt(document.getElementById('sliceSize').value, 10);

        let md5whole = new SparkMD5.ArrayBuffer();
        let md5slice = new SparkMD5.ArrayBuffer();
        let fileReader = new FileReader();
        let actualSliceSize = Number.POSITIVE_INFINITY;
        let position = 0;
        let counter = 0;
        let slice = selectedFile.slice(position, position + sliceSize);

        fileReader.onload = function (evt) {
            let arrayBuffer = evt.target.result;
            let msg = "slice #" + counter + "   position:" + position +
                    "   arrayBuffer.byteLength:" + arrayBuffer.byteLength;
            actualSliceSize = slice.size;
            ++counter;

            if (actualSliceSize > 0) {
                md5whole.append(arrayBuffer);

                msg += "   MD5: " + SparkMD5.ArrayBuffer.hash(arrayBuffer);
                output(msg);

                position += actualSliceSize;
                slice = selectedFile.slice(position, position + sliceSize);
                fileReader.readAsArrayBuffer(slice);
            } else {
                let hash = md5whole.end();
                output("MD5: " + hash);
            }

        };
        fileReader.onerror = function (err) {
            output(err);
        };
        fileReader.readAsArrayBuffer(slice);

    });

    function output(msg) {
        console.log(msg);

        let div = document.createElement('div');
        div.innerText = msg;
        document.body.appendChild(div);

    }

});
