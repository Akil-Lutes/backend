class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el])
        // console.log(req.query, queryObj);

        // 2a) Advanced Filtering
        // Want to put query string into mongoDB format
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    
        // { difficulty: 'easy', duration: { $gte: 5} }
        // { difficulty: 'easy', duration: { gte: '5' } }
        // gte, gt, lte, lt

        // stored query object in variable below. So that later on I can keep chaining more methods to it (through query class)
        this.query = this.query.find(JSON.parse(queryStr))
        // let query = Tour.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy)
            this.query = this.query.sort(sortBy);
            // sort('price ratingsAverage')
        } else {
            // If user doesn't specify a field. created tours will automatically be sorted
            // this.query = this.query.sort('-createdAt');
            this.query = this.query.sort('-name');
            // dont use query = query.sort('-createdAt'); if all documents were created the same time which causes sorts to look weird
        }
        
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            // line below produces the exact line of (name duration price)
            const fields = this.queryString.fields.split(',').join(' ')
            this.query = this.query.select(fields);
        } else {
            // just in case the user does not specify the fields
            // - means exclude
            this.query = this.query.select('-__v')
        }
        
        return this;
    }

    paginate() {
        // Defining default values (and * 1 how convert it to number)
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        // Skipping the previous results on previous pages bc of user specified page in query string/search 
        const skip = (page - 1) * limit;

        // page=2,limit=10, page 1, 11- 20, page 2, 21-20
        // amount of documents that will be skipped
        this.query = this.query.skip(skip).limit(limit);

        //
        // if (this.queryString.page) {
        //     // counts the number of documents (mongoose method)
        //     // user requests a page that does not have results on the page
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) throw new Error('This page does not exist!')
        // }

        return this;
    }
}

module.exports = APIFeatures