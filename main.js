const fileName = process.argv[2]
const path = require('path')
const ext = path.extname(fileName)
const fs = require('fs')


if (ext =='.ini') iniToJSON()
else envToJSON()

function envToJSON (){
    regexp1 = RegExp(/.+=.+/,'g')
    fs.readFile(fileName, 'utf8', function (err,data) {
        var comments = data.match(regexp1)
        let result ='{\n'
        for(let i = 0; i < comments.length; i ++){
            result += '"'+comments[i].replace('=','":"')+'"'            
        }
        result += '\n}'
        result = result.replace(/""/g,'",\n"')


        fs.writeFile('php.json',result, () => {

        })
        })
}
function iniToJSON (){
    regexp2 = RegExp(/^[[\w][^\n]*/gm)
    fs.readFile(fileName,'utf8', function (err,data) {
        let comments = data.match(regexp2)
        let result =''
        let compt = 1
        for(let i = 0; i < comments.length; i ++){
           if(comments[i].startsWith('[') && comments[i].endsWith(']')){
               result += comments[i].toString().match(/\w+/gm) + '\n{\n'
               console.log(comments[i].match(/\w+/gm))
           }
           else{
                result += '"'+comments[i].replace('=','":"')+'"'     
                if(comments[i+1].startsWith('[')){
                    result +='\n }\n'
                }      
           }
        }
        result = result.replace(/""/g,'",\n"')



        fs.writeFile('php2.json',result, () => {

        })
    })
}

