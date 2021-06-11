"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var tty_table_1 = __importDefault(require("tty-table"));
var lodash_1 = require("lodash");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(inputs) {
        this.inputs = inputs;
        var libBasePath = this.__getBasePath();
        var pkgPath = path_1.default.join(libBasePath, '..', 'package.json');
        if (pkgPath) {
            var pkg = JSON.parse(fs_1.default.readFileSync(path_1.default.join(pkgPath), 'utf8'));
            this.name = pkg.name;
        }
    }
    BaseComponent.prototype.__getBasePath = function () {
        if (this.basePath) {
            return this.basePath;
        }
        var baseName = path_1.default.basename(__dirname);
        if (baseName !== 'lib') {
            this.basePath = path_1.default.join(__dirname, '..');
        }
        else {
            this.basePath = __dirname;
        }
        return this.basePath;
    };
    BaseComponent.prototype.__doc = function (projectName) {
        var libBasePath = this.__getBasePath();
        var docPath = path_1.default.join(libBasePath, '..', 'doc', 'doc.json');
        if (fs_1.default.existsSync(docPath)) {
            var fileContent = fs_1.default.readFileSync(docPath).toString();
            var result = JSON.parse(fileContent);
            var options = {
                borderStyle: "solid",
                borderColor: "blue",
                headerAlign: "center",
                align: "left",
                color: "cyan",
                width: "100%"
            };
            var header = [{
                    value: "方法",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: "auto",
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "方法说明",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: "auto",
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "入参示例",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    }
                }, {
                    value: "命令行调用示例",
                    headerColor: "cyan",
                    color: "cyan",
                    align: "left",
                    width: 'auto',
                    formatter: function (value) {
                        return value;
                    }
                }];
            var rows_1 = [];
            var data = lodash_1.get(result, 'children[0].children', []).filter(function (item) { return item.kindString === 'Method' && lodash_1.get(item, 'flags.isPublic'); });
            var cliStr_1 = projectName ? "s " + projectName : "s cli " + this.name; // 独立组件执行使用cli
            data.forEach(function (item) {
                var params = lodash_1.get(item, 'signatures[0].parameters[0]', {});
                var paramText = lodash_1.get(params, 'comment.text', '');
                rows_1.push([item.name, lodash_1.get(item, 'signatures[0].comment.shortText', ''), paramText, cliStr_1 + " " + item.name]);
            });
            return tty_table_1.default(header, rows_1, options).render();
        }
        else {
            return 'not found doc content';
        }
    };
    return BaseComponent;
}());
exports.default = BaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDBDQUFvQjtBQUNwQiw4Q0FBd0I7QUFDeEIsd0RBQThCO0FBQzlCLGlDQUE2QjtBQUU3QjtJQUtJLHVCQUFzQixNQUFXO1FBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUM3QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekMsSUFBTSxPQUFPLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzdELElBQUksT0FBTyxFQUFFO1lBQ1QsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRUQscUNBQWEsR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN4QjtRQUNELElBQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCw2QkFBSyxHQUFMLFVBQU0sV0FBb0I7UUFDdEIsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQU0sT0FBTyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEUsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3hCLElBQU0sV0FBVyxHQUFXLFlBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEUsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2QyxJQUFNLE9BQU8sR0FBRztnQkFDWixXQUFXLEVBQUUsT0FBTztnQkFDcEIsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFdBQVcsRUFBRSxRQUFRO2dCQUNyQixLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsTUFBTTthQUNoQixDQUFBO1lBQ0QsSUFBTSxNQUFNLEdBQUcsQ0FBQztvQkFDWixLQUFLLEVBQUUsSUFBSTtvQkFDWCxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsU0FBUyxFQUFFLFVBQVUsS0FBSzt3QkFDdEIsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUM7aUJBQ0osRUFBRTtvQkFDQyxLQUFLLEVBQUUsTUFBTTtvQkFDYixXQUFXLEVBQUUsTUFBTTtvQkFDbkIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsU0FBUyxFQUFFLFVBQVUsS0FBSzt3QkFDdEIsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUM7aUJBQ0osRUFBRTtvQkFDQyxLQUFLLEVBQUUsTUFBTTtvQkFDYixXQUFXLEVBQUUsTUFBTTtvQkFDbkIsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsS0FBSyxFQUFFLE1BQU07b0JBQ2IsU0FBUyxFQUFFLFVBQVUsS0FBSzt3QkFDdEIsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUM7aUJBQ0osRUFBRTtvQkFDQyxLQUFLLEVBQUUsU0FBUztvQkFDaEIsV0FBVyxFQUFFLE1BQU07b0JBQ25CLEtBQUssRUFBRSxNQUFNO29CQUNiLEtBQUssRUFBRSxNQUFNO29CQUNiLEtBQUssRUFBRSxNQUFNO29CQUNiLFNBQVMsRUFBRSxVQUFVLEtBQUs7d0JBQ3RCLE9BQU8sS0FBSyxDQUFDO29CQUNqQixDQUFDO2lCQUNKLENBQUMsQ0FBQTtZQUNGLElBQU0sTUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFNLElBQUksR0FBRyxZQUFHLENBQUMsTUFBTSxFQUFFLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLFlBQUcsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsRUFBM0QsQ0FBMkQsQ0FBQyxDQUFDO1lBQ25JLElBQUksUUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBSyxXQUFhLENBQUMsQ0FBQyxDQUFDLFdBQVMsSUFBSSxDQUFDLElBQU0sQ0FBQyxDQUFDLGNBQWM7WUFDcEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQ2QsSUFBTSxNQUFNLEdBQUcsWUFBRyxDQUFDLElBQUksRUFBRSw2QkFBNkIsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDNUQsSUFBTSxTQUFTLEdBQUcsWUFBRyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELE1BQUksQ0FBQyxJQUFJLENBQ0wsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQUcsQ0FBQyxJQUFJLEVBQUUsaUNBQWlDLEVBQUUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFLLFFBQU0sU0FBSSxJQUFJLENBQUMsSUFBTSxDQUFDLENBQ3JHLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQTtZQUVGLE9BQU8sbUJBQUssQ0FBQyxNQUFNLEVBQUUsTUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2hEO2FBQU07WUFDSCxPQUFPLHVCQUF1QixDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVMLG9CQUFDO0FBQUQsQ0FBQyxBQS9GRCxJQStGQyJ9