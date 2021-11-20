var templateFromUrlLoader = {
    loadTemplate: function (name, templateConfig, callback) {
        if (templateConfig.fromUrl) {
            var url = templateConfig.fromUrl;

            if (templateConfig.maxCacheAge) {
                url += "?cacheAge=" + templateConfig.maxCacheAge;
            }

            $.get(url,
                function (markupString) {
                    ko.components.defaultLoader.loadTemplate(name, markupString, callback);
                });
        } else {
            callback(null);
        }
    }
};

ko.components.loaders.unshift(templateFromUrlLoader);