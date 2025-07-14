const { crawlPage } = require("./crawl");

function main(){
    if(process.argv.length < 3) {
        console.error("Please provide a URL to crawl.");
        process.exit(1);
    }
    if(process.argv.length > 3) {
        console.error("Too many arguments!");
        process.exit(1);
    }
    const urlToCrawl = process.argv[2];
    console.log(`Starting to crawl ${urlToCrawl}...`);
    crawlPage(urlToCrawl)
        .then(() => console.log("Crawling completed."))
        .catch(err => console.error(`Error during crawling: ${err.message}`));

    // for(const arg of process.argv){
    //     console.log(`Argument: ${arg}`);
    // }
}

main();