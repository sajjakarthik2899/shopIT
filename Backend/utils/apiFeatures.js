class APIFeatures {
    constructor(query, queryString) {
        this.query = query; // Mongoose query (e.g., Product.find())
        this.queryString = queryString; // req.query from the URL
    }

    search() {
        console.log(this.queryString.keyword,"XXXX")
        const keyword = this.queryString.keyword
            ? {
                  name: {
                      $regex: this.queryString.keyword,
                      $options: "i",
                  },
              }
            : {};

        this.query = this.query.where(keyword);

        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString };
      
        const removeFields = ["keyword", "limit", "page", "sort"];
        removeFields.forEach((el) => delete queryCopy[el]);
      
        // Manual transformation for price, rating, etc
        let queryObj = {};
      
        Object.keys(queryCopy).forEach((key) => {
          if (key.includes('[')) {
            const [field, operator] = key.split('[');
            const cleanOperator = operator.replace(']', '');
      
            if (!queryObj[field]) {
              queryObj[field] = {};
            }
      
            queryObj[field][`$${cleanOperator}`] = Number(queryCopy[key]); // Ensure it's a number
          } else {
            queryObj[key] = queryCopy[key];
          }
        });
      
        console.log("Final Filter Object:", queryObj);
        this.query = this.query.find(queryObj);
        return this;
      }
      

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }

    paginate(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

export default APIFeatures;
