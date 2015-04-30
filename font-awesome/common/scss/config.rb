# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
#サーバのルートパス
http_path = "/"
##### 以下は開発時の設定 #####
# project_path = '../' ##gulpだとエラーが出る？
# sass_dir = "./"
# css_dir = "../common/css"
# images_dir = "../../deploy/common/img"
# javascripts_dir = "../../deploy/common/js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

cache = true
asset_cache_buster :none


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass