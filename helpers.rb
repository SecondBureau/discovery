module DiscoveryHelpers

  def slideshow_path
    File.join root_path, source, image_path('slideshow'), 'original'
  end


  def country_path(country)
    File.join slideshow_path, country
  end

  def categories(country)
    p = country_path country
    Dir.entries(p).select {|entry| File.directory?(File.join(p, entry)) && !entry.eql?('..') && !entry.eql?('.') }
  end
  
  def discovery_images(country=nil, category=nil)
    pattern = File.join '**', "*.{jpg,png}"
    pattern = File.join category, pattern unless category.nil?
    pattern = File.join country, pattern unless country.nil?
    Dir.chdir slideshow_path do
      Dir.glob(pattern).collect do |p|
        items = p.split('/')
        country = items[0]
        category = items[1]  
        [country, category, "slideshow/original/#{p}", "slideshow/thumbnails/#{p}"]
      end
    end
  end

end