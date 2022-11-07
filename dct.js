const width = 8;
const height = 8;

function run_dct() {
    // handle
    const input = document.getElementById("input_matrix").value.replaceAll(" ", "");
    const input_arr_1_dim = input.split(",");
    if (input_arr_1_dim.length != 64) {
        console.log("Must be a 8x8 matrix.");
        return;
    }
    const input_arr_2_dim = to_2_dim_arr(input_arr_1_dim);
    console.log(input_arr_2_dim);
    
    // dct

}

function to_2_dim_arr(input_arr_1_dim) {
    var resultArray = [];
    for (var i = 0; i < input_arr_1_dim.length; i += width) {
        let tmp = [];
        for (var j = i; j < i + width; j++) {
            tmp.push(input_arr_1_dim[j]);
        }
        resultArray.push(tmp);
    }
    return resultArray;
}