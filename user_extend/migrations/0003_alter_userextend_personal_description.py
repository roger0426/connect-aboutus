# Generated by Django 3.2 on 2021-05-25 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_extend', '0002_userextend_events'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextend',
            name='personal_description',
            field=models.TextField(default='喔喔，看來他還沒想好介紹', max_length=300),
        ),
    ]