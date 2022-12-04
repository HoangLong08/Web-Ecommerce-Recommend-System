function TfIdf() {}

TfIdf.prototype.weights = function (documents, term) {
  var results = [];

  var idf = this.idf(documents, term);

  for (var i = 0; i < documents.length; i++) {
    var tf = this.tf(documents[i].value, term);
    var tfidf = tf * idf;
    var result = {
      weight: tfidf,
      doc: documents[i].value,
      idProduct: documents[i].idProduct,
    };

    results.push(result);
  }

  return results;
};

TfIdf.prototype.tf = function (words, term) {
  var result = 0;

  for (var i = 0; i < words.length; i++) {
    var word = words[i];

    if (word.indexOf(term) != -1) {
      result = result + 1;
    }
  }

  return result / words.length;
};

TfIdf.prototype.idf = function (documents, term) {
  var occurrence = 0;
  for (var j = 0; j < documents.length; j++) {
    var doc = documents[j].value;

    if (this.__wordInsideDoc(doc, term)) {
      occurrence = occurrence + 1;
    }
  }

  if (occurrence === 0) {
    return 0;
  }
  return Math.log(documents.length / occurrence);
};

TfIdf.prototype.__wordInsideDoc = function (doc, term) {
  for (var i = 0; i < doc.length; i++) {
    var word = doc[i];
    if (word.indexOf(term) !== -1) {
      return true;
    }
  }

  return false;
};

module.exports = TfIdf;
