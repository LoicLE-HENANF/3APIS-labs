import { ArticleModel } from "../models/articleModel.js";

export async function populate() {
    const articles = [
        { name: "Article 1", description: "Description 1", price: 10 },
        { name: "Article 2", description: "Description 2", price: 20 },
        { name: "Article 3", description: "Description 3", price: 30 },
        { name: "Article 4", description: "Description 4", price: 40 },
        { name: "Article 5", description: "Description 5", price: 50 },
        { name: "Article 6", description: "Description 6", price: 60 },
        { name: "Article 7", description: "Description 7", price: 70 },
        { name: "Article 8", description: "Description 8", price: 80 },
        { name: "Article 9", description: "Description 9", price: 90 },
        { name: "Article 10", description: "Description 10", price: 100 },
        { name: "Article 11", description: "Description 11", price: 110 },
        { name: "Article 12", description: "Description 12", price: 120 },
        { name: "Article 13", description: "Description 13", price: 130 },
        { name: "Article 14", description: "Description 14", price: 140 },
        { name: "Article 15", description: "Description 15", price: 150 },
        { name: "Article 16", description: "Description 16", price: 160 },
        { name: "Article 17", description: "Description 17", price: 170 },
        { name: "Article 18", description: "Description 18", price: 180 },
        { name: "Article 19", description: "Description 19", price: 190 },
        { name: "Article 20", description: "Description 20", price: 200 }
    ]
    
    // do articles exist
    const articleCount = await ArticleModel.find();
    if (articleCount.length > 10) {
        console.log('Articles already populated');
        return;
    }
    
    // create the 20 articles
    await ArticleModel.insertMany(articles).then(() => {
        console.log('Articles populated');
    }).catch((err) => {
        console.error('Error adding articles', err);
    })
}