const db = require("../utils/database");
const TfIdf = require("../rs/TfIdf");

const TABLE_NAME_PRODUCTS = "products";
const TABLE_NAME_IMAGES_PRODUCT = "imagesproduct";
const TABLE_NAME_SPECIFICATIONS = "specifications";
const TABLE_NAME_OPTIONS = "options";
const TABLE_NAME_ATTRIBUTES = "attributes";
const TABLE_NAME_BRANDS = "brands";
const TABLE_NAME_CATEGORIES = "categories";
const TABLE_NAME_EVALUATES = "evalues";
const TABLE_NAME_CUSTOMER = "customers";

function stringToArray(str) {
  let arr = [""];
  let j = 0;

  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === ",") {
      j++;
      arr.push("");
    } else {
      arr[j] += str.charAt(i);
    }
  }
  return arr;
}

const len = function (obj) {
  let len = 0;
  // console.log("obj: ", obj);
  for (let [key, value] of Object.entries(obj)) {
    len++;
  }
  // console.log("len: ", len);
  return len;
};

const euclidean_score = function (dataset, p1, p2) {
  // console.log("p1, p2: ", p1, p2);
  let existp1p2 = {}; //store item existing in both item
  //if dataset is in p1 and p2
  //store it in as one
  for (var key in dataset[p1]) {
    if (key in dataset[p2]) {
      existp1p2[key] = 1;
    }
    if (len(existp1p2) == 0) return 0; //check if it has a data
    var sum_of_euclidean_dist = []; //store the  euclidean distance

    //calculate the euclidean distance
    for (item in dataset[p1]) {
      if (item in dataset[p2]) {
        // console.log("item: ", dataset[p1][item]);
        sum_of_euclidean_dist.push(
          Math.pow(dataset[p1][item].stars - dataset[p2][item].stars, 2)
        );
      }
    }
    var sum = 0;
    for (var i = 0; i < sum_of_euclidean_dist.length; i++) {
      // console.log("sum_of_euclidean_dist: ", sum_of_euclidean_dist);
      sum += sum_of_euclidean_dist[i]; //calculate the sum of the euclidean
    }
    //since the sum will be small for familiar user
    // and larger for non-familiar user
    //we make it exist between 0 and 1
    // console.log("Math.sqrt(sum): ", Math.sqrt(sum));
    var sum_sqrt = 1 / (1 + Math.sqrt(sum));
    return sum_sqrt;
  }
};
// khoang cach cang nho thi cang giong nhau nguoc lai se k giong nhau
// console.log("res: ", euclidean_score(dataset, "Hoang Long", "Long Vo Nguyen"));

// -------------------------------------------------------------------
// https://becominghuman.ai/introduction-to-recommendation-system-in-javascript-74209c7ff2f7
// about ranking
const pearson_correlation = function (dataset, p1, p2) {
  let existp1p2 = {};
  for (item in dataset[p1]) {
    if (item in dataset[p2]) {
      // console.log(" existp1p2[item] ", existp1p2[item]);
      existp1p2[item] = 1;
    }
  }
  let num_existence = len(existp1p2);
  // console.log("num_existence: ", num_existence);
  if (num_existence == 0) return 0;
  //store the sum and the square sum of both p1 and p2
  //store the product of both
  let p1_sum = 0,
    p2_sum = 0,
    p1_sq_sum = 0,
    p2_sq_sum = 0,
    prod_p1p2 = 0;
  //calculate the sum and square sum of each data point
  //and also the product of both point
  for (var item in existp1p2) {
    p1_sum += dataset[p1][item].stars;
    p2_sum += dataset[p2][item].stars;
    p1_sq_sum += Math.pow(dataset[p1][item].stars, 2);
    p2_sq_sum += Math.pow(dataset[p2][item].stars, 2);
    prod_p1p2 += dataset[p1][item].stars * dataset[p2][item].stars;
  }
  // console.log(
  //   "p1_sum, p2_sum, p1_sq_sum, p2_sq_sum, prod_p1p2: ",
  //   p1_sum,
  //   p2_sum,
  //   p1_sq_sum,
  //   p2_sq_sum,
  //   prod_p1p2
  // );
  let numerator = prod_p1p2 - (p1_sum * p2_sum) / num_existence;
  let st1 = p1_sq_sum - Math.pow(p1_sum, 2) / num_existence;
  let st2 = p2_sq_sum - Math.pow(p2_sum, 2) / num_existence;
  let denominator = Math.sqrt(st1 * st2);
  if (denominator == 0) return 0;
  else {
    var val = numerator / denominator;
    return val;
  }
};

// console.log(
//   "pearson_correlation: ",
//   pearson_correlation(dataset, "Hoang Long", "Long Vo Nguyen")
// );

const similar_user = function (dataset, person, num_user, distance) {
  let scores = [];
  for (var others in dataset) {
    if (others != person && typeof dataset[others] != "function") {
      var val = distance(dataset, person, others);
      var p = others;
      scores.push({ val: val, p: p });
    }
  }
  scores.sort(function (a, b) {
    return b.val < a.val ? -1 : b.val > a.val ? 1 : b.val >= a.val ? 0 : NaN;
  });
  let score = [];
  for (var i = 0; i < num_user; i++) {
    score.push(scores[i]);
  }
  return score;
};

const addImage = (idProduct, item) => {
  return new Promise((resolve) => {
    resolve(
      db.execute(`INSERT INTO ${TABLE_NAME_IMAGES_PRODUCT} (idProduct, name,  url)
                  VALUES (${idProduct}, '${item.name}' ,'${item.url}')`)
    );
  });
};

const addSpecification = (idProduct, item) => {
  return new Promise((resolve) => {
    const q = `INSERT INTO ${TABLE_NAME_SPECIFICATIONS} (idProduct, label, value)
    VALUES (${idProduct}, '${item.label}', '${item.value}')`;
    // console.log("q: ", q);
    resolve(db.execute(q));
  });
};

const updateSpecification = (idProduct, item) => {
  // console.log("item: ", item);
  // return {};
  return new Promise((resolve, reject) => {
    try {
      const q = `INSERT INTO ${TABLE_NAME_SPECIFICATIONS} (idSpecification, idProduct, label, value)
    VALUES (${
      item.idSpecification ? item.idSpecification : "''"
    }, ${idProduct}, '${item.label}', '${item.value}') 
    ON DUPLICATE KEY UPDATE
  idSpecification=${
    item.idSpecification ? item.idSpecification : 999999
  }, idProduct=1, label = '${item.label}', value = '${item.value}'`;
      resolve(db.execute(q));
    } catch (error) {
      console.log("error: ", error);
      reject(error);
    }
  });
};

class Product {
  fetchAll = async () => {
    // return an array containing records of db
    return await db.execute(`select * from ${TABLE_NAME_PRODUCTS}`);
  };

  getAllProductByCategory = async (nameUrl) => {
    const q = `select *, ${TABLE_NAME_PRODUCTS}.name as 'name' from ${TABLE_NAME_PRODUCTS} inner join ${TABLE_NAME_CATEGORIES} on ${TABLE_NAME_PRODUCTS}.idCategory =  ${TABLE_NAME_CATEGORIES}.idCategory where ${TABLE_NAME_CATEGORIES}.url = '${nameUrl}'`;
    console.log("q: ", q);
    // return an array containing records of db
    return await db.execute(q);
  };

  detail = async (idProduct) => {
    // could use promise.all :)
    let res = {};
    const [queryProduct] = await db.execute(
      `select * from ${TABLE_NAME_PRODUCTS} where idProduct = ${idProduct}`
    );
    const queryImageByIdProduct = await db.execute(
      `select * from ${TABLE_NAME_IMAGES_PRODUCT} where idProduct = ${idProduct}`
    );
    const querySpecificationsByIdProduct = await db.execute(
      `select * from ${TABLE_NAME_SPECIFICATIONS} where idProduct = ${idProduct}`
    );
    const queryOptions = await db.execute(
      `select * from ${TABLE_NAME_OPTIONS} where idProduct = ${idProduct}`
    );

    let resOptions = [];
    await Promise.all(
      queryOptions[0].map(async (item) => {
        const queryAttributes = await db.execute(
          `select * from ${TABLE_NAME_ATTRIBUTES} where idOption = ${item.idOption}`
        );
        await resOptions.push({
          ...item,
          attribute: queryAttributes[0],
        });
        return resOptions;
      })
    );

    res = {
      ...queryProduct[0],
      images: queryImageByIdProduct[0],
      specifications: querySpecificationsByIdProduct[0],
      options: resOptions,
      // evaluates: queryEvaluates[0],
    };

    return res;
  };

  // admin
  /**
	 * SELECT *, `brands`.'name' as 'nameBrand' FROM `products` 
			inner join `brands` on `brands`.'idBrand' = `products`.`idBrand` 
			inner join `categories` on `products`.`idCategory` = `categories`.`idCategory`
	 * 
	 */
  fetchAllAdmin = async () => {
    // return an array containing records of db
    const query = `SELECT *, ${TABLE_NAME_PRODUCTS}.name as nameProduct, ${TABLE_NAME_BRANDS}.name as nameBrand, ${TABLE_NAME_CATEGORIES}.name as nameCategory FROM ${TABLE_NAME_PRODUCTS} 
			inner join ${TABLE_NAME_BRANDS} on ${TABLE_NAME_BRANDS}.idBrand = ${TABLE_NAME_PRODUCTS}.idBrand 
			inner join ${TABLE_NAME_CATEGORIES} on ${TABLE_NAME_PRODUCTS}.idCategory = ${TABLE_NAME_CATEGORIES}.idCategory`;

    return await db.execute(query);
  };

  addProductsAdminModel = async (info) => {
    const {
      thumbnail,
      images,
      description,
      price,
      listOptions,
      specifications,
      name,
      inventory,
      category,
      brand,
      isOption,
      isDiscount,
      discount,
    } = info;
    const queryProduct = `INSERT INTO ${TABLE_NAME_PRODUCTS} 
																(idCategory, idBrand, name, price, isOption, thumbnail, isDiscount, discount, inventory, description, criteria) 
													VALUES (${category}, ${brand}, '${name}', ${price}, ${isOption}, '${thumbnail.url}', ${isDiscount}, '', '', '', '');`;
    const executeProduct = await db.execute(queryProduct);
    console.log("executeProduct: ", executeProduct);
    const { insertId } = executeProduct[0];

    const executeImages = await Promise.all(
      images.map((item) => {
        return addImage(insertId, item);
      })
    );

    await listOptions.forEach(async (elementOption) => {
      const queryOption =
        await db.execute(`INSERT INTO ${TABLE_NAME_OPTIONS} (nameOption, idProduct)
                          VALUES ('${elementOption.nameAttr}', '${insertId}')`);

      await elementOption.listOptionChild.forEach(async (elementChild) => {
        await db.execute(`INSERT INTO ${TABLE_NAME_ATTRIBUTES} (idOption, nameAttribute, priceAttribute)
                          VALUES (${queryOption[0].insertId} , '${
          elementChild.nameOption
        }', ${parseInt(elementChild.price)})`);
      });
    });

    const executeSpecifications = await Promise.all(
      specifications.map((item) => {
        return addSpecification(insertId, item);
      })
    );

    // console.log("executeOptions: ", executeOptions);
    return {
      ...executeProduct[0],
    };
  };

  updateProductsAdminModel = async (info) => {
    const {
      idProduct,
      thumbnail,
      images,
      description,
      price,
      listOptions,
      specifications,
      name,
      inventory,
      category,
      brand,
      isOption,
      isDiscount,
      discount,
    } = info;

    const queryProduct = `UPDATE ${TABLE_NAME_PRODUCTS} SET name = '${name}', price = ${price}, isDiscount = ${isDiscount}, discount = ${discount}, inventory = ${inventory}, description = '${description}', criteria = '123'  WHERE idProduct=${idProduct}`;
    console.log("queryProduct: ", queryProduct);
    const executeProduct = await db.execute(queryProduct);

    const executeSpecifications = await Promise.all(
      specifications.map((item) => {
        if ((item.label.length !== 0) | (item.value.length !== 0)) {
          return updateSpecification(idProduct, item);
        }
        return {};
      })
    );
  };

  fetchProductSimilar = async (specs, idProduct) => {
    var tfIdf = new TfIdf();
    const querySpecifications = await db.execute(
      `select * from ${TABLE_NAME_SPECIFICATIONS} where idProduct != ${idProduct} Order by idProduct DESC`
    );
    let resSpecs = [];
    let tmpSpecs = [];
    let output = [];

    // merge value of specifications track idProduct
    await querySpecifications[0].forEach(function (item) {
      var existing = output.filter(function (v, i) {
        return v.idProduct == item.idProduct;
      });
      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].value = output[existingIndex].value.concat(
          item.value
        );
      } else {
        if (typeof item.value == "string") item.value = [item.value];
        output.push(item);
      }
    });

    // console.dir(output);
    let newArr = [];
    await specs.forEach((element) => {
      const r = tfIdf
        .weights(output, element)
        .sort((a, b) => b.weight - a.weight);
      // console.log("r: ", r);
      r.forEach((item) => newArr.push(item));
    });

    let temp = {};
    await newArr.forEach(function (obj) {
      if (!temp[obj.idProduct]) {
        temp[obj.idProduct] = obj.weight;
      } else {
        temp[obj.idProduct] = Number(temp[obj.idProduct]) + Number(obj.weight);
      }
    });

    //Format the data into desired output
    var resultWeights = [];
    for (var key in temp) {
      resultWeights.push({
        idProduct: key,
        weight: temp[key],
      });
    }
    // console.log(resultWeights);
    let resFinal = [];
    let resultWeightsHightest = resultWeights
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 10);

    console.log("resultWeightsHightest: ", resultWeightsHightest);

    await Promise.all(
      resultWeightsHightest.map(async (element) => {
        const q = `select * from ${TABLE_NAME_PRODUCTS} where idProduct = ${parseInt(
          element.idProduct
        )}`;

        const [queryProduct] = await db.execute(q);
        await resFinal.push({
          ...queryProduct[0],
        });
        return resFinal;
      })
    );

    return resFinal;
  };

  fetchProductRatingSimilar = async (idCustomer) => {
    // const queryAllProduct = await db.execute(
    //   `select  ${TABLE_NAME_PRODUCTS}.idProduct, ${TABLE_NAME_EVALUATES}.idCustomer from ${TABLE_NAME_PRODUCTS} inner join ${TABLE_NAME_EVALUATES} on ${TABLE_NAME_EVALUATES}.idProduct = ${TABLE_NAME_PRODUCTS}.idProduct Order by idCustomer ASC`
    // );
    console.log("idCustomer model: ", idCustomer);

    const queryAllCustomer = await db.execute(
      `select  ${TABLE_NAME_CUSTOMER}.idCustomer from ${TABLE_NAME_CUSTOMER} Order by idCustomer ASC`
    );

    console.log("queryAllCustomer: ", queryAllCustomer[0].length);

    let datasetFilter = {};

    await Promise.all(
      queryAllCustomer[0].map(async (item, index) => {
        // console.log("item: ", item.idCustomer);
        const queryEvaluate = await db.execute(
          `select idProduct, stars from ${TABLE_NAME_EVALUATES} where idCustomer = ${item.idCustomer} Order by idCustomer ASC`
        );
        // console.log("queryCustomer: ", queryCustomer[0]);
        // datasetFilter.push({
        //   ${item.idProduct}: []
        // });
        datasetFilter[item.idCustomer] = queryEvaluate[0];
      })
    );

    // console.log("datasetFilter: ", datasetFilter);

    // console.log(
    //   "similar_user: ",
    //   similar_user(
    //     datasetFilter,
    //     "1",
    //     queryAllCustomer[0].length,
    //     pearson_correlation
    //   )
    // );

    let resFinal = [];

    const similar_user_arr = similar_user(
      datasetFilter,
      idCustomer.toString(),
      queryAllCustomer[0].length,
      pearson_correlation
    );

    await Promise.all(
      similar_user_arr.map(async (item) => {
        if (item?.p) {
          const q = `select * from ${TABLE_NAME_EVALUATES} inner join ${TABLE_NAME_PRODUCTS} on ${TABLE_NAME_PRODUCTS}.idProduct = ${TABLE_NAME_EVALUATES}.idProduct where idCustomer = ${parseInt(
            item?.p
          )} `;
          const executeQuery = await db.execute(q);
          let resTemp = [];
          // console.log("executeQuery: ", executeQuery[0]);
          await executeQuery[0]?.forEach((item) => {
            resTemp.push(item);
          });
          resFinal.push(...resTemp);
        }
      })
    );

    // console.log("resFinal: ", resFinal[0]);
    return resFinal;
  };

  getSearchListProduct = async (queryString) => {
    const { keyword, priceGte, priceLte, brands, order } = queryString;

    let q = `select *, ${TABLE_NAME_PRODUCTS}.name as 'name' from ${TABLE_NAME_PRODUCTS}`;
    if (brands?.length > 0) {
      let resBrand = ``;
      let brandConvert = stringToArray(brands);
      brandConvert.forEach((item) => (resBrand += `,'${item}'`));
      const result = resBrand.substring(1);
      q += ` inner join ${TABLE_NAME_CATEGORIES} on  ${TABLE_NAME_CATEGORIES}.idCategory = ${TABLE_NAME_PRODUCTS}.idCategory
      inner join ${TABLE_NAME_BRANDS} on  ${TABLE_NAME_BRANDS}.idCategory = ${TABLE_NAME_CATEGORIES}.idCategory where ${TABLE_NAME_BRANDS}.name in (${result})`;
      if (keyword) {
        q += ` and ${TABLE_NAME_PRODUCTS}.name like '%${keyword}%'`;
      } else {
      }
    }
    if (keyword && !brands) {
      q += ` where name like '%${keyword}%'`;
    }
    if (priceGte || priceLte) {
      q += ` and price BETWEEN ${parseInt(priceGte)} and ${parseInt(priceLte)}`;
    }

    if (order) {
      q += ` order by price ${order}`;
    }

    const [queryProduct] = await db.execute(q);
    return queryProduct;
  };
}

module.exports = new Product();
