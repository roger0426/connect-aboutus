# Generated by Django 3.2 on 2021-05-13 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='tag_type',
            field=models.CharField(choices=[('個性', '個性'), ('專長', '專長'), ('有興趣的活動', '有興趣的活動')], default='活動', max_length=8),
        ),
    ]
