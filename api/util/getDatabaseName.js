function getDatabaseName() {
    const isTest = process.env.NODE_ENV === 'test';
    return isTest ? 'knowledgebase_test' : 'knowledgebase';
}

module.exports = getDatabaseName;
