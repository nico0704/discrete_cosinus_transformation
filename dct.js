// constants to make algorithm more efficient
const SIZE = 8;
const RECIPROCAL_SQRT_2 = 1.0 / Math.sqrt(2);
const PI = Math.PI;

function compute() {
    // handle input
    var input_arr_2_dim = get_input();
    console.log(input_arr_2_dim);

    // dct

    // create 8x8 Array and assign all values with 0
    var result_matrix = Array(SIZE).fill(0).map(x => Array(SIZE).fill(0));
    var u, v, cu, cv, j, k, sum;

    for (u = 0; u < SIZE; u++) {
        for (v = 0; v < SIZE; v++) {
            // C(u), C(v)
            cu = u == 0 ? RECIPROCAL_SQRT_2 : 1.0;
            cv = v == 0 ? RECIPROCAL_SQRT_2 : 1.0;
            sum = 0.0;
            for (j = 0; j < SIZE; j++) {
                for (k = 0; k < SIZE; k++) {
                    // tmp -> f(j,k)
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
    display_output(result_matrix);
    // end
}

function get_input() {
    var resultArray = [];
    for (var y = 0; y < SIZE; y++) {
        // store values for each row in an tmp array
        let tmp = [];
        for (var x = 0; x < SIZE; x++) {
            tmp.push(document.getElementById("input_field_" + y + "" + x).value)
        }
        // push tmp array to 2 dim result array
        resultArray.push(tmp);
    }
    return resultArray;
}

function display_output(result_matrix) {
    for (var y = 0; y < SIZE; y++) {
        for (var x = 0; x < SIZE; x++) {
            var output_field = document.getElementById("output_field_" + y + "" + x);
            output_field.value = result_matrix[y][x];
        }
    }
}