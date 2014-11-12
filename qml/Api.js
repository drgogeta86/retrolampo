.pragma library

var coverImage = "";
var coverUsername =""
var BASE="https://api.instagram.com"
var access_token = "";
var selfId;

function request(verb, endpoint, obj, cb, includeBase) {
    print('request: ' + verb + ' ' + (includeBase? BASE:'') + (endpoint? endpoint:''))
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(cb) {
                var res;
                try {
                    res = JSON.parse(xhr.responseText.toString())
                } catch(err) {
                    res = {}
                    res['error'] = xhr.responseText.toString()
                }
                cb(res);

            }
        }
    }
    xhr.open(verb, (includeBase? BASE:'')  + (endpoint? endpoint:''));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    var data = obj?obj:''
    xhr.send(data)
}

function get_Popular(cb) {
    request('GET', '/v1/media/popular?access_token=' + access_token, null, cb, true)
}
function get_UserFeed(cb) {
    request('GET', '/v1/users/self/feed?access_token=' + access_token, null, cb, true)
}
function get_TagFeed(tag, cb) {
    request('GET', '/v1/tags/' + tag + '/media/recent?access_token=' + access_token, null, cb, true)
}

function get_Tags(searchFor, cb) {
    request('GET', '/v1/tags/search?q=' + searchFor + '&access_token=' + access_token, null, cb, true)
}


function get_MediaById(mediaId,cb) {
    request('GET', '/v1/media/' + mediaId + '?access_token=' + access_token, null, cb, true)
}

function get_UserById(userID,cb) {
    request('GET', '/v1/users/' + userID + '?access_token=' + access_token, null, cb, true)
}

function get_UserRelationshipById(userID,cb) {
    request('GET', '/v1/users/' + userID + '/relationship?access_token=' + access_token, null, cb, true)
}

function get_UserFollowers(userID,cb) {
    request('GET', '/v1/users/' + userID + '/followed-by?access_token=' + access_token, null, cb, true)
}

function get_UserFollowing(userID,cb) {
    request('GET', '/v1/users/' + userID + '/follows?access_token=' + access_token, null, cb, true)
}



function like(mediaId,cb) {
    request('POST', '/v1/media/' + mediaId + '/likes?access_token=' + access_token, null, cb, true)
}

function unlike(mediaId,cb) {
    request('DELETE', '/v1/media/' + mediaId + '/likes?access_token=' + access_token, null, cb, true)
}

function follow(userID,cb) {
    request('POST', '/v1/users/' + userID + '/relationship?access_token=' + access_token, "action=follow", cb, true)
}


function unfollow(userID,cb) {
    request('POST', '/v1/users/' + userID + '/relationship?access_token=' + access_token, "action=unfollow", cb, true)
}

function blockUser(userID,cb) {
    request('POST', '/v1/users/' + userID + '/relationship?action=block&access_token=' + access_token, null, cb, true)
}

function unblockUser(userID,cb) {
    request('POST', '/v1/users/' + userID + '/relationship?action=unblock&access_token=' + access_token, null, cb, true)
}

function approveUser(userID,cb) {
    request('POST', '/v1/users/' + userID + '/relationship?action=approve&access_token=' + access_token, null, cb, true)
}

function ignoreUser(userID,cb) {
    request('POST', '/v1/users/' + userID + '/relationship?action=ignore&access_token=' + access_token, null, cb, true)
}

function get_Url(url, cb) {
    request('GET', url, null, cb, false)
}

function get_RecentMediaByUserId(userID,cb) {
    request('GET', '/v1/users/' + userID + '/media/recent?access_token=' + access_token, null, cb, true)
}

function post_Comment(mediaId,comment){
    request('POST', '/v1/media/' + mediaId + '/comment/?access_token=' + access_token, 'comment_text= '
            + comment, 'reload' , cb,   true)

}
