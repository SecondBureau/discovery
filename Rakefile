namespace :assets do
  task :precompile => :compile_thumbnails do
    
    sh "middleman build"
  end
  
  task :compile_thumbnails do
    require 'RMagick'
    include Magick
    root = File.expand_path(File.join('..', 'source', 'images', 'slideshow'), __FILE__)
    src_path = File.join(root, 'original')
    tar_path = File.join(root, 'thumbnails')
    pattern = File.join '**', "*.{jpg,png}"
    FileUtils.rm_rf tar_path
    Dir.chdir src_path do
      Dir.glob(pattern).each do |i|
        img = Magick::Image.read(File.join(src_path, i)).first
        thumb = img.scale(0.5)
        tar_filename = File.join(tar_path, i)
        FileUtils.mkdir_p(File.dirname(tar_filename))
        thumb.write tar_filename
      end
    end
  end
  
  task :mockup_images do
    require 'RMagick'
    include Magick
    root = File.expand_path(File.join('..', 'source', 'images', 'slideshow'), __FILE__)
    src_path = File.join(root, 'original')
    Dir.entries(src_path).each do |country| 
      next unless File.directory?(File.join(src_path, country)) && !country.eql?('..') && !country.eql?('.')
      Dir.entries(File.join(src_path, country)).each do |category|
        next unless File.directory?(File.join(src_path, country, category)) && !category.eql?('..') && !category.eql?('.')
        FileUtils.rm Dir.glob(File.join(src_path, country, category,'*.jpg'))
        (1..rand(15)+5).each do |i|
          width = rand(2).eql?(0) ? 250 : 520
          height = rand(2).eql?(0) ? 250 : 510
          f = Image.new(width, height) { self.background_color = "grey" }
          text = Magick::Draw.new
          text.pointsize = width.eql?(250) ? 40 : 50
          text.font_family = 'courier'
          text.font_weight = 200
          text.gravity = Magick::CenterGravity
          text.annotate(f, 0,0,0,0, "#{width} x #{height}") { self.fill = '#353432' }
          f.write File.join(src_path, country, category, "image#{i}.jpg")
          #puts File.join(src_path, country, category, "image#{i}.jpg")
        end
      end
    end
  end
end