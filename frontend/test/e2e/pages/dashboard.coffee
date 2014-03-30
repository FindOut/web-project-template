class DashboardView
  
  By = protractor.By

  constructor: ->
    @header = element(By.linkText('Hansoft Web Summary'))
    @aboutDialog = element(By.id('about'))
    @aboutLink = element(By.linkText('About'))
    @lastUpdated = element(By.binding('dashboard.lastUpdated'))

    @completedWp = element(By.linkText('WP136 (TRs and Uplift) Smiletenance'))
    @includeCompletedCheckbox = element(By.model('dashboard.showCompleted'))

    @onTrackCheckbox = element(By.model('dashboard.statusFilter.onTrack'))
    @warningCheckbox = element(By.model('dashboard.statusFilter.warning'))
    @offTrackCheckbox = element(By.model('dashboard.statusFilter.offTrack'))

  get: ->
    browser.get '/'
    browser.waitForAngular()

  clickAboutLink: ->
    @aboutLink.click()
    browser.sleep(500) #Wait for animation
    @


  visibleOnTrackWps: ->
    browser.findElements(By.xpath(buildVisibleWpXpath('on_track')))

  visibleWarningWps: ->
    browser.findElements(By.xpath(buildVisibleWpXpath('warning')))

  visibleOffTrackWps: ->
    browser.findElements(By.xpath(buildVisibleWpXpath('off_track')))


  containsClassName = (className) ->
    "contains(#{concatClassNameSelector(className)})"

  concatClassNameSelector = (className) ->
    "concat(' ', normalize-space(@class), ' '), ' #{className} '"

  buildVisibleWpXpath = (className) ->
    xpath = "//div[contains(#{concatClassNameSelector('wp')})"
    xpath += " and not(contains(#{concatClassNameSelector('ng-hide')}))"
    xpath += " and div/div/p/span[#{containsClassName(className)}]"
    xpath += "]"

module.exports = DashboardView
