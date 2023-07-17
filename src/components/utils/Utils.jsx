const preloadImage = (image) => {
    if (image!==undefined){
        const newImage = new Image();
        newImage.src = image;
        window[image] = newImage;
    }
}

const logVar = (txt) => {
 
    if(process.env.NODE_ENV=="development"){
        console.log(txt);
    }
    return;
}

const isValidSlug = (pageSlug) => {
    // chech for sql injection in the pageSlug variable
    if (pageSlug.includes('\'')||
        pageSlug.includes('\"')||
        pageSlug.includes(';')||
        pageSlug.includes('--')||
        pageSlug.includes('/*')||
        pageSlug.includes('*/')||
        pageSlug.includes('xp_')||
        pageSlug.includes('sp_')||
        pageSlug.includes('create')||
        pageSlug.includes('drop')||
        pageSlug.includes('alter')||
        pageSlug.includes('insert')||
        pageSlug.includes('update')||
        pageSlug.includes('delete')||
        pageSlug.includes('truncate')||
        pageSlug.includes('declare')||
        pageSlug.includes('xp_cmdshell')||
        pageSlug.includes('select')||
        pageSlug.includes('union')||
        pageSlug.includes('join')||
        pageSlug.includes('where')||
        pageSlug.includes('having')||
        pageSlug.includes('group by')||
        pageSlug.includes('order by')||
        pageSlug.includes('asc')||
        pageSlug.includes('desc')||
        pageSlug.includes('limit')||
        pageSlug.includes('offset')||
        pageSlug.includes('fetch')||
        pageSlug.includes('open')||
        pageSlug.includes('commit')||
        pageSlug.includes('rollback')||
        pageSlug.includes('create')||
        pageSlug.includes('drop')||
        pageSlug.includes('alter')||
        pageSlug.includes('rename')||
        pageSlug.includes('backup')||
        pageSlug.includes('restore')||
        pageSlug.includes('deny')||
        pageSlug.includes('revoke')||
        pageSlug.includes('shutdown')||
        pageSlug.includes('reconfigure')||
        pageSlug.includes('exec')||
        pageSlug.includes('execute')||
        pageSlug.includes('sp_oacreate')||
        pageSlug.includes('sp_oamethod')||
        pageSlug.includes('sp_oagetproperty')||
        pageSlug.includes('sp_oamethod')||
        pageSlug.includes('sp_oasetproperty')||
        pageSlug.includes('sp_oamethod')||
        pageSlug.includes('sp_oageterrorinfo'
	)) {
        return false;
    }
    return true;
}

export {
    preloadImage,
    logVar,
    isValidSlug
}