const WIDTH = 8;
const HEIGHT = 8;
const RECIPROCAL_SQRT_2 = 1.0 / Math.sqrt(2);
const PI = Math.PI;

function run_dct() {
    // handle input matrix
    const input = document.getElementById("input_matrix").value.replaceAll(" ", "");
    const input_arr_1_dim = input.split(",");
    if (input_arr_1_dim.length != 64) {
        console.log("Must be a 8x8 matrix.");
        return;
    }
    const input_arr_2_dim = to_2_dim_arr(input_arr_1_dim);
    console.log(input_arr_2_dim);

    // dct
    var result_matrix = Array(8).fill(0).map(x => Array(8).fill(0));
    var u, v, cu, cv, j, k, sum;
    for (u = 0; u < WIDTH; u++) {
        for (v = 0; v < HEIGHT; v++) {
            cu = u == 0 ? RECIPROCAL_SQRT_2 : 1.0;
            cv = v == 0 ? RECIPROCAL_SQRT_2 : 1.0;
            sum = 0.0;
            for (j = 0; j < 8; j++) {
                for (k = 0; k < 8; k++) {
                    var tmp = input_arr_2_dim[j][k];
                    tmp *= Math.cos(((2 * j + 1) * u * PI) / 16);
                    tmp *= Math.cos(((2 * k + 1) * v * PI) / 16);
                    sum += tmp;
                }
            }
            result_matrix[u][v] = Math.round(0.25 * cu * cv * sum); 
        }
    }
    console.log(result_matrix);
    document.getElementById("output_matrix").innerHTML = result_matrix;
}

function to_2_dim_arr(input_arr_1_dim) {
    var resultArray = [];
    for (var i = 0; i < input_arr_1_dim.length; i += WIDTH) {
        let tmp = [];
        for (var j = i; j < i + WIDTH; j++) {
            tmp.push(input_arr_1_dim[j]);
        }
        resultArray.push(tmp);
    }
    return resultArray;
}