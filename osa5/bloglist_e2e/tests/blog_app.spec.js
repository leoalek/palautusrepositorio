const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'testuser',
        name: 'test',
        password: 'password',
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'secondaryUser',
        name: 'sec',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    let locator = page.getByTestId('login-form')
    await expect(locator).toBeVisible()

    locator = page.getByRole('textbox').first()
    await expect(locator).toBeVisible()

    locator = page.getByRole('textbox').last()
    await expect(locator).toBeVisible()

    locator = page.getByRole('button', {name:'login'})
    await expect(locator).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('testuser')
        await page.getByTestId('password').fill('password')

        await page.getByRole('button', {name:'login'}).click()

        await expect(page.getByText('test logged in')).toBeVisible()
    })

    test('fail with incorrect credenttials', async ({ page }) => {
        await page.getByTestId('username').fill('testuser')
        await page.getByTestId('password').fill('wrong_password')

        await page.getByRole('button', {name:'login'}).click()
        
        await expect(page.getByText('wrong credentials')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
          loginWith(page,'testuser','password')
      })
    
      test('a new blog can be created', async ({ page }) => {
          
          createBlog(page, 'testTitle', 'testAurhor', 'http://test.url')

          await expect(page.getByText('blog added')).toBeVisible()
      })

      describe('Blog tests', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'testTitle1', 'testAurhor1', 'http://test.url')
          await createBlog(page, 'testTitle2', 'testAurhor2', 'http://test.url')
          await createBlog(page, 'testTitle3', 'testAurhor3', 'http://test.url')
          await createBlog(page, 'testTitle4', 'testAurhor3', 'http://test.url')
        })

        test('blog can be liked', async ({ page }) => {
          const blog = page.locator('.blog').filter({hasText: 'testTitle1'})
          
          await blog.getByRole('button', {name: 'show'}).click()
          await blog.getByRole('button',{name:'like'}).click()

          await expect(blog.getByText('likes: 1')).toBeVisible()
        })

        test('blog can be deleted if user is the creator', async ({ page }) => {
          const blog = page.locator('.blog').filter({hasText: 'testTitle1'})

          await blog.getByRole('button',{name:'show'}).click()

          page.on('dialog',  async (dialog) =>  {
            await dialog.accept()
          })

          await blog.getByRole('button',{name:'delete'}).click()

          await expect(blog).toHaveCount(0)
        })

        test('logging out', async ({ page }) => {
          await page.getByRole('button', {name: 'logout'}).click()
          await expect(page.getByText('logged out')).toBeVisible()
        })
        
        test('Delete button does not exist when not creator', async ({ page }) => {
          await page.getByRole('button',{name: 'logout'}).click()

          await loginWith(page,'secondaryUser', 'password')

          const blog = page.locator('.blog').filter({hasText:'testTitle2'})

          await blog.getByRole('button',{name: 'show'}).click()
          
          await expect(blog.getByRole('button',{name:'delete'})).toBeHidden()
        })

        test('blogs shown descending order by likes', async ({ page }) => {
          const blog_number = 4

          for(let i = 0; i < blog_number;i++){
            await page.getByRole('button',{name:'show'}).nth(0).click()
          }

          await expect(page.getByText('likes: 0').nth(0)).toBeVisible()
          await expect(page.getByText('likes: 0').nth(1)).toBeVisible()
          await expect(page.getByText('likes: 0').nth(2)).toBeVisible()
          await expect(page.getByText('likes: 0').nth(3)).toBeVisible()

          const movingBlog = page.locator('.blog').filter({hasText:'testTitle3'})
          await movingBlog.getByRole('button',{name:'like'}).click()

          const newFirstBlog = page.locator('.blog').nth(0)

          await page.waitForLoadState('networkidle')
          const newFirstBlogTitle = await newFirstBlog.textContent();

          expect(newFirstBlogTitle).toContain('testTitle3')
        })
      })
    })
  })
})