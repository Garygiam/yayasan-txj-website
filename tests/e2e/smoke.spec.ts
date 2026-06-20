import {expect, test, type Page} from '@playwright/test'

async function getNearestSectionSurface(page: Page, headingName: RegExp) {
  return page
    .getByRole('heading', {name: headingName})
    .locator('xpath=ancestor::section[1]')
    .evaluate((element: HTMLElement) => {
      const styles = window.getComputedStyle(element)

      return {
        backgroundImage: styles.backgroundImage,
        borderRadius: styles.borderRadius,
        paddingTop: styles.paddingTop,
      }
    })
}

async function getHeadingGroupLayout(
  page: Page,
  firstHeading: RegExp,
  secondHeading: RegExp,
) {
  return page.evaluate(
    ({firstPattern, secondPattern}: {firstPattern: string; secondPattern: string}) => {
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
      const first = headings.find((element) => new RegExp(firstPattern, 'i').test(element.textContent ?? ''))
      const second = headings.find((element) => new RegExp(secondPattern, 'i').test(element.textContent ?? ''))
      const firstCard = first?.closest('article, section') ?? null
      const secondCard = second?.closest('article, section') ?? null
      const sharedParent =
        firstCard instanceof HTMLElement &&
        secondCard instanceof HTMLElement &&
        firstCard.parentElement === secondCard.parentElement
          ? firstCard.parentElement
          : null
      const styles = sharedParent ? window.getComputedStyle(sharedParent) : null
      const gridTemplateColumns = styles?.gridTemplateColumns ?? ''

      return {
        columnCount: gridTemplateColumns
          .split(' ')
          .map((value) => value.trim())
          .filter(Boolean).length,
        grouped: Boolean(sharedParent),
      }
    },
    {firstPattern: firstHeading.source, secondPattern: secondHeading.source},
  )
}

test('home redirects to /en and renders', async ({page}) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/en\/?$/)
  await expect(page.locator('header').getByRole('link', {name: /^TXJ Care$/i})).toBeVisible()
})

test('header brand shows the logo lockup on the homepage', async ({page}) => {
  await page.goto('/en')

  await expect(page.locator('header').getByAltText(/TXJ Care logo/i)).toBeVisible()
  await expect(page.locator('header').getByText('Care That Connects')).toBeVisible()
  await expect(page.locator('header').getByText('TXJ Care', {exact: true})).toHaveCount(0)
})

test('header brand link returns to the locale homepage', async ({page}) => {
  await page.goto('/en/about')

  await page.locator('header').getByRole('link', {name: /^TXJ Care$/i}).click()

  await expect(page).toHaveURL(/\/en\/?$/)
})

test('header brand remains visible on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en')

  await expect(page.locator('header').getByAltText(/TXJ Care logo/i)).toBeVisible()
  await expect(page.locator('header').getByText('Care That Connects')).toBeVisible()
})

test('homepage header shows a refined shell and grouped actions', async ({page}) => {
  await page.goto('/en')

  const headerStyles = await page.locator('header').evaluate((element: HTMLElement) => {
    const styles = window.getComputedStyle(element)

    return {
      backgroundImage: styles.backgroundImage,
      borderRadius: styles.borderRadius,
      paddingLeft: styles.paddingLeft,
      paddingRight: styles.paddingRight,
    }
  })

  expect(headerStyles).toEqual({
    backgroundImage: expect.stringContaining('linear-gradient'),
    borderRadius: '32px',
    paddingLeft: '28px',
    paddingRight: '28px',
  })
})

test('homepage header keeps donate and locale switcher visually coordinated', async ({page}) => {
  await page.goto('/en')

  const donateLink = page.locator('header').getByRole('link', {name: /^Donate$/i})
  const localeTrigger = page.locator('header').getByRole('button', {name: /^EN v$/i})

  await expect(donateLink).toHaveCSS('min-height', '46px')
  await expect(localeTrigger).toHaveCSS('min-height', '46px')
  await expect(localeTrigger).toHaveCSS('border-radius', '999px')
})

test('header remains cleanly grouped on mobile after menu polish', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en')

  const header = page.locator('header')

  await expect(header.getByAltText(/TXJ Care logo/i)).toBeVisible()
  await expect(header.getByRole('link', {name: /^Donate$/i})).toBeVisible()
  await expect(header.getByRole('button', {name: /^EN v$/i})).toBeVisible()
  await expect(header).toHaveCSS('padding-top', '16px')
})

test('homepage still renders key hero content after font rollout', async ({page}) => {
  await page.goto('/en')

  await expect(
    page.getByRole('heading', {name: /Building Bridges of Compassion Across Malaysia/i}),
  ).toBeVisible()
})

test('homepage exposes the hero, stats, and urgent needs content', async ({page}) => {
  await page.goto('/en')

  const hero = page.getByRole('region', {name: /Homepage hero/i})

  await expect(hero).toBeVisible()
  await expect(hero.getByRole('img')).toBeVisible()
  await expect(page.getByRole('link', {name: /Donate Now/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /Volunteer Today/i})).toBeVisible()
  await expect(page.getByText(/Families helped/i)).toBeVisible()
  await expect(page.getByText(/Urgent Needs/i)).toBeVisible()
  await expect(page.getByRole('link', {name: /Donate Essentials/i})).toBeVisible()
})

test('homepage exposes pillar, founder, and story sections', async ({page}) => {
  await page.goto('/en')

  await expect(page.getByRole('heading', {name: /Homeless Support/i})).toBeVisible()
  await expect(page.getByText(/How Help Works/i)).toBeVisible()
  await expect(page.getByText(/Founder Spotlight/i)).toBeVisible()
  await expect(page.getByText(/Latest Updates/i)).toBeVisible()
  await expect(page.getByRole('link', {name: /^Partner$/i})).toBeVisible()
})

test('homepage keeps navigation and primary CTAs visible', async ({page}) => {
  await page.goto('/en')

  await expect(page.getByRole('link', {name: /^About$/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /^Programs$/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /^Impact$/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /^Get involved$/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /^Contact$/i})).toBeVisible()
  await expect(page.locator('footer')).toContainText('support@yayasantxj.org')

  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(247, 241, 228)')

  const donateLink = page.locator('header').getByRole('link', {name: /^Donate$/i})
  await expect(donateLink).toHaveCSS('border-radius', '999px')
  await expect(donateLink).toHaveCSS('background-image', /linear-gradient/i)
})

test('homepage shows partnership and NGO partnership sections above the footer', async ({page}) => {
  await page.goto('/en')

  const partnershipHeading = page.getByRole('heading', {name: /In Partnership With/i})
  const ngoHeading = page.getByRole('heading', {name: /^NGO Partnership$/i})
  const partnershipTiles = page.getByTestId('partnership-logo-tile')
  const ngoTiles = page.getByTestId('ngo-partnership-logo-tile')

  await expect(partnershipHeading).toBeVisible()
  await expect(ngoHeading).toBeVisible()
  await expect(partnershipTiles).toHaveCount(4)
  await expect(ngoTiles).toHaveCount(1)
  await expect(ngoTiles.first()).toContainText(/Persatuan Kebajikan dan usahawan tavan sabah/i)
  await expect(ngoTiles.first()).toContainText(/PKUTS \/ Tavan/i)

  const sectionsAreOrdered = await page.evaluate(() => {
    const partnership = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find((element) =>
      /In Partnership With/i.test(element.textContent ?? ''),
    )?.closest('section')
    const ngo = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find((element) =>
      /^NGO Partnership$/i.test(element.textContent ?? ''),
    )?.closest('section')
    const footer = document.querySelector('footer')

    return Boolean(
      partnership instanceof HTMLElement &&
        ngo instanceof HTMLElement &&
        footer instanceof HTMLElement &&
        partnership.compareDocumentPosition(ngo) & Node.DOCUMENT_POSITION_FOLLOWING &&
        ngo.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING,
    )
  })

  expect(sectionsAreOrdered).toBe(true)
})

test('homepage partnership and NGO sections remain tidy on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en')

  const partnershipTiles = page.getByTestId('partnership-logo-tile')
  const ngoTiles = page.getByTestId('ngo-partnership-logo-tile')
  const ngoHeading = page.getByRole('heading', {name: /^NGO Partnership$/i})

  await expect(ngoHeading).toBeVisible()
  await expect(partnershipTiles).toHaveCount(4)
  await expect(ngoTiles).toHaveCount(1)
  await expect(ngoTiles.first()).toContainText(/PKUTS \/ Tavan/i)

  const ngoIsBelowPartnership = await page.evaluate(() => {
    const partnership = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find((element) =>
      /In Partnership With/i.test(element.textContent ?? ''),
    )?.closest('section') as HTMLElement | null
    const ngo = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find((element) =>
      /^NGO Partnership$/i.test(element.textContent ?? ''),
    )?.closest('section') as HTMLElement | null

    if (!partnership || !ngo) return false

    const partnershipBottom = partnership.getBoundingClientRect().bottom
    const ngoTop = ngo.getBoundingClientRect().top

    return ngoTop >= partnershipBottom
  })

  expect(ngoIsBelowPartnership).toBe(true)
})

test('get involved page shows a polished hero and featured volunteer layout', async ({page}) => {
  await page.goto('/en/get-involved')

  await expect(page.getByRole('heading', {name: /Get involved/i})).toBeVisible()
  await expect(page.getByText(/Join practical compassion in action/i)).toBeVisible()
  await expect(page.getByRole('heading', {name: /^Volunteer$/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /^Partnership$/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /^Donate$/i})).toBeVisible()
  await expect(page.getByRole('button', {name: /Sign up to volunteer/i})).toBeVisible()
  await expect(page.getByRole('button', {name: /Submit partnership inquiry/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /Go to donate/i})).toBeVisible()

  const volunteerSection = page
    .getByRole('heading', {name: /Volunteer with TXJ Care/i})
    .locator('xpath=ancestor::section[1]')
  await expect(volunteerSection).toHaveCSS('border-radius', '28px')
})

test('get involved page stays readable on mobile after UI polish', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en/get-involved')

  await expect(page.getByRole('heading', {name: /Get involved/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Volunteer with TXJ Care/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Partnership opportunities/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /Go to donate/i})).toBeVisible()

  const actionCards = page.getByTestId('get-involved-action-card')
  await expect(actionCards).toHaveCount(3)

  const distinctRowCount = await actionCards.evaluateAll((elements) => {
    return new Set(
      elements.map((element) => Math.round((element as HTMLElement).getBoundingClientRect().top)),
    ).size
  })

  expect(distinctRowCount).toBeGreaterThan(1)
})

test('contact page shows an editorial hero, info card, and polished form layout', async ({page}) => {
  await page.goto('/en/contact')

  await expect(page.getByRole('heading', {name: /^Contact$/i})).toBeVisible()
  await expect(page.getByText(/We would love to hear from you/i)).toBeVisible()
  await expect(page.getByRole('heading', {name: /Contact details/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Send us a message/i})).toBeVisible()
  await expect(page.getByRole('button', {name: /Send message/i})).toBeVisible()

  const contactShell = page.getByRole('heading', {name: /Contact details/i}).locator('xpath=ancestor::section[1]')
  await expect(contactShell).toHaveCSS('border-radius', '28px')
})

test('contact page and footer show the company address', async ({page}) => {
  await page.goto('/en/contact')

  const contactSection = page
    .getByRole('heading', {name: /Contact details/i})
    .locator('xpath=ancestor::article[1]')

  await expect(contactSection).toContainText('9A, Jln Kenari 7')
  await expect(contactSection).toContainText('Bandar Puchong Jaya')
  await expect(contactSection).toContainText('47100 Puchong, Selangor')

  const footer = page.locator('footer')
  await expect(footer).toContainText('9A, Jln Kenari 7')
  await expect(footer).toContainText('Bandar Puchong Jaya')
  await expect(footer).toContainText('47100 Puchong, Selangor')
})

test('donate page shows an editorial hero, polished donation card, and reassurance band', async ({page}) => {
  await page.goto('/en/donate')

  await expect(page.getByRole('heading', {name: /^Donate$/i})).toBeVisible()
  await expect(page.getByText(/Support practical compassion with confidence/i)).toBeVisible()
  await expect(page.getByRole('heading', {name: /Choose your gift/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Why your support matters/i})).toBeVisible()
  await expect(page.getByRole('button', {name: /Continue to donation/i})).toBeVisible()
})

test('donate page reveals the manual payment panel with the selected amount and WhatsApp action', async ({
  page,
}) => {
  await page.goto('/en/donate')

  await expect(page.getByRole('button', {name: /Continue to donation/i})).toBeVisible()
  await expect(page.getByRole('button', {name: /Pay by Bank \/ QR/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Manual payment details/i})).toHaveCount(0)

  await page.getByRole('button', {name: /^RM 100$/i}).click()
  await page.getByRole('button', {name: /Pay by Bank \/ QR/i}).click()

  const manualPaymentPanel = page.getByLabel('Manual payment details')

  await expect(page.getByRole('heading', {name: /Manual payment details/i})).toBeVisible()
  await expect(manualPaymentPanel.getByText(/^Amount to pay$/i)).toBeVisible()
  await expect(manualPaymentPanel.getByText(/^RM 100$/i)).toBeVisible()
  await expect(manualPaymentPanel.getByRole('heading', {name: /^Bank transfer$/i})).toBeVisible()
  await expect(
    manualPaymentPanel.getByRole('heading', {name: /^Malaysia National QR$/i}),
  ).toBeVisible()
  await expect(manualPaymentPanel.getByRole('heading', {name: /Touch 'n Go QR/i})).toBeVisible()
  await expect(manualPaymentPanel.getByRole('img', {name: /QR/i})).toHaveCount(2)

  const whatsappLink = page.getByRole('link', {name: /Confirm payment on WhatsApp/i})
  await expect(whatsappLink).toBeVisible()
  await expect(whatsappLink).toHaveAttribute('href', /wa\.me/)
  await expect(whatsappLink).toHaveAttribute('href', /RM%20100|RM\+100/)
})

test('donate page still sends the selected amount to Billplz before redirecting', async ({page}) => {
  let requestBody = ''

  await page.route('**/api/donations/billplz/create', async (route) => {
    requestBody = route.request().postData() ?? ''

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({url: '/en/donate?billplz=ok'}),
    })
  })

  await page.goto('/en/donate')
  await page.getByLabel(/Custom amount \(optional\)/i).fill('88')
  await page.getByLabel(/Email \(optional\)/i).fill('giver@example.com')
  await page.getByRole('button', {name: /Continue to donation/i}).click()

  await expect(page).toHaveURL(/billplz=ok/)
  expect(JSON.parse(requestBody)).toEqual({
    amountMYR: 88,
    email: 'giver@example.com',
  })
})

test('donate page keeps the manual payment panel readable on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en/donate')

  await page.getByRole('button', {name: /^RM 20$/i}).click()
  await page.getByRole('button', {name: /Pay by Bank \/ QR/i}).click()

  await expect(page.getByRole('heading', {name: /Manual payment details/i})).toBeVisible()
  await expect(page.getByRole('img', {name: /QR/i})).toHaveCount(2)
  await expect(page.getByRole('link', {name: /Confirm payment on WhatsApp/i})).toBeVisible()
})

test('contact and donate pages stay readable on mobile after the editorial refresh', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})

  await page.goto('/en/contact')
  await expect(page.getByRole('heading', {name: /Contact details/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Send us a message/i})).toBeVisible()

  await page.goto('/en/donate')
  await expect(page.getByRole('heading', {name: /Choose your gift/i})).toBeVisible()
  await expect(page.getByRole('button', {name: /Continue to donation/i})).toBeVisible()
})

test('impact page shows a gallery-first hero, story grid, and donate CTA', async ({page}) => {
  await page.goto('/en/impact')

  await expect(page.getByRole('heading', {name: /^Impact$/i})).toBeVisible()
  await expect(page.getByText(/Real stories and moments of care across Malaysia/i)).toBeVisible()
  await expect(page.getByRole('heading', {name: /Impact gallery/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Stories of impact/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /Donate now/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /Go to donate/i})).toBeVisible()

  const galleryTiles = page.getByTestId('impact-gallery-tile')
  await expect(galleryTiles.first()).toBeVisible()
})

test('impact page remains readable on mobile with gallery and story sections', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en/impact')

  await expect(page.getByRole('heading', {name: /^Impact$/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Impact gallery/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Stories of impact/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /Go to donate/i})).toBeVisible()

  const storyCards = page.getByTestId('impact-story-card')
  await expect(storyCards.first()).toBeVisible()
})

test('about page renders featured leader and grouped leadership cards', async ({page}) => {
  await page.goto('/en/about')

  await expect(page.getByRole('heading', {name: /Our Four Pillars/i})).toBeVisible()
  await expect(page.getByText(/A movement of practical compassion\./i)).toBeVisible()
  await expect(page.getByText(/5,000\+ families received essential packs/i)).toBeVisible()
  await expect(page.getByText(/Founder and Chair/i)).toBeVisible()
  await expect(page.getByRole('heading', {name: /Board of Directors/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Management Team/i})).toBeVisible()
})

test('about leadership profiles link to dedicated team profile pages', async ({page}) => {
  await page.goto('/en/about')

  await page.locator('a[href="/en/about/team/gary-giam"]').click()

  await expect(page).toHaveURL(/\/en\/about\/team\/gary-giam$/)
  await expect(page.getByRole('heading', {name: /^Gary Giam$/i})).toBeVisible()
})

test('about page shows grouped intro and mission cards', async ({page}) => {
  await page.goto('/en/about')

  const introSurface = await getNearestSectionSurface(page, /About TXJ Care/i)
  const missionVisionLayout = await getHeadingGroupLayout(page, /Our Mission/i, /Our Vision/i)

  expect({
    introHasCardSurface:
      introSurface.backgroundImage !== 'none' && introSurface.borderRadius === '28px',
    missionVisionColumnCount: missionVisionLayout.columnCount,
    missionVisionGrouped: missionVisionLayout.grouped,
  }).toEqual({
    introHasCardSurface: true,
    missionVisionColumnCount: 2,
    missionVisionGrouped: true,
  })
})

test('about page presents pillars and impact in structured cards', async ({page}) => {
  await page.goto('/en/about')

  const pillarsHeading = page.getByRole('heading', {name: /Our Four Pillars/i})
  const pillarsSection = pillarsHeading.locator('xpath=ancestor::section[1]')

  await expect(pillarsHeading).toBeVisible()
  await expect(pillarsSection.getByRole('heading', {name: /^Homeless Support$/i})).toBeVisible()

  const pillarsSurface = await getNearestSectionSurface(page, /Our Four Pillars/i)
  const impactSurface = await getNearestSectionSurface(page, /Our Impact So Far/i)

  expect({
    impactCardCount: await page
      .getByRole('heading', {name: /Our Impact So Far/i})
      .locator('xpath=ancestor::section[1]//article')
      .count(),
    impactHasSectionCard:
      impactSurface.backgroundImage !== 'none' && impactSurface.borderRadius === '28px',
    pillarCardCount: await page
      .getByRole('heading', {name: /Our Four Pillars/i})
      .locator('xpath=ancestor::section[1]//article')
      .count(),
    pillarsHasSectionCard:
      pillarsSurface.backgroundImage !== 'none' && pillarsSurface.borderRadius === '28px',
  }).toEqual({
    impactCardCount: 5,
    impactHasSectionCard: true,
    pillarCardCount: 4,
    pillarsHasSectionCard: true,
  })
})

test('about page keeps the polished content layout readable on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en/about')

  const mainPaddingTop = await page.locator('main').evaluate((element: HTMLElement) => {
    return window.getComputedStyle(element).paddingTop
  })
  const missionVisionLayout = await getHeadingGroupLayout(page, /Our Mission/i, /Our Vision/i)
  const youthValuesLayout = await getHeadingGroupLayout(page, /The TXJ Youth Corps/i, /Our Values/i)

  expect({
    mainPaddingTop,
    missionVisionColumnCount: missionVisionLayout.columnCount,
    missionVisionGrouped: missionVisionLayout.grouped,
    youthValuesColumnCount: youthValuesLayout.columnCount,
    youthValuesGrouped: youthValuesLayout.grouped,
  }).toEqual({
    mainPaddingTop: '32px',
    missionVisionColumnCount: 1,
    missionVisionGrouped: true,
    youthValuesColumnCount: 1,
    youthValuesGrouped: true,
  })

  await expect(page.getByRole('heading', {name: /Management Team/i})).toBeVisible()
})

test('about page keeps leadership headings readable on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en/about')

  await expect(page.getByRole('heading', {name: /Board of Directors/i})).toBeVisible()
  await expect(page.getByRole('heading', {name: /Management Team/i})).toBeVisible()
})

test('locale pages still render after font rollout', async ({page}) => {
  await page.goto('/zh/about')

  await expect(page.getByRole('heading', {name: /关于 TXJ Care/i})).toBeVisible()
})

test('localized routes expose the document language on the html root', async ({page}) => {
  await page.goto('/en/about')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')

  await page.goto('/bm/about')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ms-MY')

  await page.goto('/zh/about')
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
})

test('bm locale pages do not expose obvious English UI copy on major public routes', async ({
  page,
}) => {
  await page.goto('/bm')
  await expect(page.getByRole('heading', {name: /In Partnership With/i})).toHaveCount(0)
  await expect(page.getByRole('heading', {name: /NGO Partnership/i})).toHaveCount(0)
  await expect(page.getByRole('link', {name: /Learn More/i})).toHaveCount(0)

  await page.goto('/bm/get-involved')
  await expect(page.getByRole('heading', {name: /Get involved/i})).toHaveCount(0)
  await expect(page.getByRole('heading', {name: /Volunteer with TXJ Care/i})).toHaveCount(0)

  await page.goto('/bm/contact')
  await expect(page.getByRole('heading', {name: /^Contact$/i})).toHaveCount(0)
  await expect(page.getByRole('heading', {name: /Contact details/i})).toHaveCount(0)

  await page.goto('/bm/about')
  await expect(page.getByRole('link', {name: /Phone:/i})).toHaveCount(0)
  await expect(page.getByRole('link', {name: /Email:/i})).toHaveCount(0)
})

test('zh locale pages do not expose obvious English UI copy on major public routes', async ({
  page,
}) => {
  await page.goto('/zh')
  await expect(page.getByRole('heading', {name: /In Partnership With/i})).toHaveCount(0)
  await expect(page.getByRole('heading', {name: /NGO Partnership/i})).toHaveCount(0)
  await expect(page.getByRole('link', {name: /Learn More/i})).toHaveCount(0)

  await page.goto('/zh/donate')
  await expect(page.getByRole('heading', {name: /^Donate$/i})).toHaveCount(0)
  await expect(page.getByRole('button', {name: /Continue to donation/i})).toHaveCount(0)

  await page.goto('/zh/media')
  await expect(page.getByRole('heading', {name: /^Media$/i})).toHaveCount(0)
  await expect(page.getByText(/Newspaper coverage and public mentions/i)).toHaveCount(0)

  await page.goto('/zh/about')
  await expect(page.getByRole('link', {name: /Phone:/i})).toHaveCount(0)
  await expect(page.getByRole('link', {name: /Email:/i})).toHaveCount(0)
})

test('locale switcher preserves the current page path', async ({page}) => {
  await page.goto('/en/about')

  await page.getByRole('button', {name: /^EN v$/i}).click()
  await page.getByRole('link', {name: /Bahasa Melayu/i}).click()

  await expect(page).toHaveURL(/\/bm\/about$/)
})

test('homepage shows one compact locale switcher trigger', async ({page}) => {
  await page.goto('/en')

  await expect(page.getByRole('button', {name: /^EN v$/i})).toBeVisible()
  await expect(page.getByRole('link', {name: /^BM$/i})).toHaveCount(0)
  await expect(page.getByRole('link', {name: /^ZH$/i})).toHaveCount(0)
})

test('locale switcher remains usable on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en')

  await expect(page.getByRole('button', {name: /^EN v$/i})).toBeVisible()
})

test('program detail route loads a known fallback program', async ({page}) => {
  await page.goto('/en/programs/homeless')

  await expect(page.getByRole('heading', {name: /Homeless Support/i})).toBeVisible()
  await expect(
    page.getByText(/practical frontline support for homeless communities through food aid/i),
  ).toBeVisible()
})

test('homepage exposes canonical social metadata and organization schema', async ({page}) => {
  await page.goto('/en')

  await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute('content', /TXJ Care/i)
  await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
    'content',
    /community support across Malaysia/i,
  )
  await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', /\/en$/)

  const schemaScripts = page.locator('script[type="application/ld+json"]')
  expect(await schemaScripts.count()).toBeGreaterThan(0)

  const schemaText = await schemaScripts.allTextContents()
  expect(schemaText.join('\n')).toContain('"@type":"Organization"')
  expect(schemaText.join('\n')).toContain('"@type":"NonprofitOrganization"')
})

test('program detail pages expose metadata and breadcrumb schema', async ({page}) => {
  await page.goto('/en/programs/homeless')

  await expect(page).toHaveTitle(/Homeless Support/i)
  await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
    'content',
    /frontline support/i,
  )
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/en\/programs\/homeless$/,
  )

  const schemaText = (await page.locator('script[type="application/ld+json"]').allTextContents()).join('\n')
  expect(schemaText).toContain('"@type":"BreadcrumbList"')
})

test('header exposes a Media link and the media page renders newspaper coverage cards', async ({
  page,
}) => {
  await page.goto('/en')

  await expect(page.getByRole('link', {name: /^Media$/i})).toBeVisible()
  await page.getByRole('link', {name: /^Media$/i}).click()

  await expect(page).toHaveURL(/\/en\/media$/)
  await expect(page.getByRole('heading', {name: /^Media$/i})).toBeVisible()
  await expect(page.locator('main').getByText(/^Newspaper coverage and public mentions$/i)).toBeVisible()
  await expect(page.getByTestId('media-card').first()).toBeVisible()
})

test('media page handles missing links and external links safely', async ({page}) => {
  await page.goto('/en/media')

  const firstLink = page.getByRole('link', {name: /Read article/i}).first()
  await expect(firstLink).toHaveAttribute('target', '_blank')
  await expect(firstLink).toHaveAttribute('rel', /noreferrer/)

  await expect(page.getByText(/Link available soon/i).first()).toBeVisible()
})

test('media page remains readable on mobile', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844})
  await page.goto('/en/media')

  await expect(page.getByRole('heading', {name: /^Media$/i})).toBeVisible()
  await expect(page.getByTestId('media-card').first()).toBeVisible()
})

test('sitemap includes all major public routes including media', async ({page}) => {
  await page.goto('/sitemap.xml')

  await expect(page.locator('body')).toContainText('/en/media')
  await expect(page.locator('body')).toContainText('/bm/media')
  await expect(page.locator('body')).toContainText('/zh/media')
})

test('sitemap includes dynamic program and team profile routes', async ({request}) => {
  const response = await request.get('/sitemap.xml')
  const body = await response.text()

  expect(response.ok()).toBe(true)
  expect(body).toContain('/en/programs/homeless')
  expect(body).toContain('/bm/programs/homeless')
  expect(body).toContain('/zh/programs/homeless')
  expect(body).toContain('/en/about/team/gary-giam')
})

test('major public pages expose page-specific titles instead of one generic title', async ({page}) => {
  await page.goto('/en/about')
  await expect(page).toHaveTitle(/About|TXJ/i)

  await page.goto('/en/donate')
  await expect(page).toHaveTitle(/Donate|TXJ/i)
})
