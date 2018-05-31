import AppConfig from '../Configs/AppConfig.js'

export class App
{
    constructor(data) {
        this._config   = AppConfig;
        this._provider = null;
        this._status   = {};
        
        if (typeof data.autoload !== 'undefined') {
            this.autoload(data.autoload);
        }

        //Notify: autoload is not defined in the main file.
    }
    
    load(loader, params) {
        var globalThis = this;
        
        var loaders    = {
            provider: function(providerKey) {
                let provider = globalThis._config.application.providers[providerKey];
                
                if (typeof provider === 'function') {
                    globalThis._provider = new provider();
                    
                    return true;
                }
                
                //Notify: provider not defined in AppConfig.
                return false;
            }
        }
        
        if (typeof loaders[loader] === 'function') {
            return loaders[loader](params);   
        }
        
        //Notify: Loader is not defined in the App file
        return false;
    }
    
    autoload(loaders) {
        for (var loader in loaders) {
            this._status[loaders[loader]] = {
                loader: loaders[loader],
                type:   loader,
                status: this.load(loader, loaders[loader])
            }
        }
    }
    
    call(callerName, params = {}) {        
        let caller = this._provider._callers[callerName];
        
        if (typeof caller !== 'undefined') {
            return new caller.instance({
                repositories: caller.repositories,
                params      : params
            })
        }
        
        //Notify: Caller not add in the provider.
        return null;
    }
}