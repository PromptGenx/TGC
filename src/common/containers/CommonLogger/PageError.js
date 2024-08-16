
class PageError {
    static ObjPageError = null;
    ErrorObjectDesc = {
    	api: '',
    	request: '',
    	datetimestamp: '',
    	action: ''
    };

    MakeLive () {
    	console.log('Make me live')
    }

    ClearErrorObject () {
    	this.ErrorObjectDesc['api'] = ''
    	this.ErrorObjectDesc['request'] = ''
    	this.ErrorObjectDesc['datetimestamp'] = ''
    	this.ErrorObjectDesc['action'] = ''
    }

    SetErrorDescription (api, request, action) {
    	this.ClearErrorObject()
    	this.ErrorObjectDesc['api'] = api
    	this.ErrorObjectDesc['request'] = request
    	this.ErrorObjectDesc['datetimestamp'] = new Date()
    	this.ErrorObjectDesc['action'] = action
    }

    static GetInstance () {
    	if (PageError.ObjPageError === null) {
    		PageError.ObjPageError = new PageError()
    	}
    	return PageError.ObjPageError
    }
}

export default PageError
