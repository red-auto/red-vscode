"use strict";

var vscode = require('vscode');
var fs = require('fs');

var outputChannel1 = vscode.window.createOutputChannel("OutputChannel1");
var red_pkg = {};
var menu = [];

function handle_command(command) {
    switch(command) {
        case "red_menu": {
            vscode.window.showQuickPick(menu).then(function (menu_item) {
                red_pkg.contributes.commands.some(function(element1,index1,array1){
                    if (element1.title == menu_item.substr(0, menu_item.lastIndexOf("(") - 1)) {
                        handle_command(element1.command);
                        return true;
                    }
                });
            });
        } break;
        case "red_interpret": {

        } break;
        case "red_compile": {
            
        } break;
        case "red_compile_gui": {
            
        } break;
        case "red_call_compile_result": {
            
        } break;
        default: {
            command = "unhandled command: " + command;
        }
    }
    outputChannel1.append(command + "\r\n");
    outputChannel1.show();
}
function activate(context) {
    red_pkg = JSON.parse(fs.readFileSync(context.extensionPath + '/package.json', 'utf8'));
    red_pkg.contributes.commands.forEach(function(element1,index1,array1){
        red_pkg.contributes.keybindings.some(function(element2,index2,array3){
            if (element1.command == element2.command) {
                if (element1.command != "red_menu") {
                    menu.push(element1.title + " (" + element2.key + ")");
                }
                context.subscriptions.push(vscode.commands.registerCommand( element1.command, function(){handle_command(element1.command);} ));
                return true; //forEach can not use break
            }
        });
    });
}
exports.activate = activate;