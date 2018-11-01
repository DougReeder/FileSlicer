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
        let slice = selectedFile.slice(position, position + sliceSize);

        fileReader.onload = function (evt) {
            let arrayBuffer = evt.target.result;
            let msg = "slice #" + counter + "   position:" + position +
                    "   arrayBuffer.byteLength:" + arrayBuffer.byteLength;
            actualSliceSize = slice.size;
            ++counter;

            if (actualSliceSize > 0) {
                crypto.subtle.digest("SHA-256", arrayBuffer).then(function (hash) {
                    msg += "   SHA-256: " + hex(hash);
                    output(msg);

                    position += actualSliceSize;
                    slice = selectedFile.slice(position, position + sliceSize);
                    fileReader.readAsArrayBuffer(slice);
                });
            } else {
                output("done");
            }

        };
        fileReader.onerror = function (err) {
            console.error(err);
        };
        fileReader.readAsArrayBuffer(slice);

    });

    function hex(buffer) {
        var hexCodes = [];
        var view = new DataView(buffer);
        for (var i = 0; i < view.byteLength; i += 4) {
            // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
            var value = view.getUint32(i)
            // toString(16) will give the hex representation of the number without padding
            var stringValue = value.toString(16)
            // We use concatenation and slice for padding
            var padding = '00000000'
            var paddedValue = (padding + stringValue).slice(-padding.length)
            hexCodes.push(paddedValue);
        }

        // Join all the hex strings into one
        return hexCodes.join("");
    }

    function output(msg) {
        console.log(msg);

        let div = document.createElement('div');
        div.innerText = msg;
        document.body.appendChild(div);

    }

});
