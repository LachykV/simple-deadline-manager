import { test, expect } from '@playwright/test'

test.describe('Додавання завдання', () => {
  test('додає нове завдання через форму', async ({ page }) => {
    await page.goto('/')

    await page
      .getByPlaceholder('Назва завдання...')
      .fill('Підготувати лабораторну №2')

    await page.locator('input[type="date"]').evaluate((input) => {
      input.value = '2026-05-20'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      input.dispatchEvent(new Event('change', { bubbles: true }))
    })

    await page.getByLabel('Категорія завдання').selectOption('Навчання')
    await page.getByRole('button', { name: /Додати/i }).click()

    await expect(page.getByText('Підготувати лабораторну №2')).toBeVisible()
    await expect(page.locator('.category-chip').filter({ hasText: 'Навчання' })).toBeVisible()
  })

  test('не додає завдання з порожньою назвою', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: /Додати/i })).toBeDisabled()
  })
})